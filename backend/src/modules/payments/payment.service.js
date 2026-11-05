import { randomUUID } from "node:crypto";
import { prisma } from "../../common/utils/prismaClient.js";
import { AppError } from "../../errors/AppError.js";
import { createPaymentProviderRegistry } from "./payment.provider.js";
import { getBuyerProtectionWindowMs } from "../../common/config/protection.config.js";

const registry = createPaymentProviderRegistry();
const PROTECTION_WINDOW_MS = getBuyerProtectionWindowMs();

function paymentError(message, code, statusCode = 409) {
  return new AppError(message, { statusCode, code, isOperational: true });
}

function decimalToScaledInteger(value, scale) {
  const text = String(value);
  const [whole, fraction = ""] = text.split(".");
  if (
    !/^\d+$/.test(whole) ||
    !/^\d*$/.test(fraction) ||
    fraction.length > scale
  ) {
    throw paymentError(
      "Order amount has invalid precision",
      "PAYMENT_AMOUNT_INVALID",
      500,
    );
  }
  return (
    BigInt(whole) * 10n ** BigInt(scale) +
    BigInt(fraction.padEnd(scale, "0") || "0")
  );
}

function getOrderAmountInMinorUnits(order) {
  return (
    (decimalToScaledInteger(order.quantity, 2) *
      decimalToScaledInteger(order.pricePerUnitAtOrder, 2)) /
    100n
  );
}

export function assertProviderPaymentMatchesOrder({ order, providerPayment }) {
  if (
    !["PENDING", "CONFIRMED", "IN_TRANSIT", "DELIVERED", "DISPUTED"].includes(
      order.status,
    )
  ) {
    throw paymentError(
      "Payment cannot be captured for this order status",
      "PAYMENT_ORDER_STATUS_INVALID",
    );
  }

  const expectedAmount = getOrderAmountInMinorUnits(order);

  if (BigInt(providerPayment.amount) !== expectedAmount) {
    throw paymentError(
      "Provider payment amount does not match the order",
      "PAYMENT_AMOUNT_MISMATCH",
    );
  }
  if (providerPayment.currency !== order.currency) {
    throw paymentError(
      "Provider payment currency does not match the order",
      "PAYMENT_CURRENCY_MISMATCH",
    );
  }
  if (providerPayment.buyerId !== order.buyerId) {
    throw paymentError(
      "Provider payment buyer does not match the order",
      "PAYMENT_BUYER_MISMATCH",
    );
  }
  if (providerPayment.status !== "success") {
    throw paymentError(
      "Provider payment is not successful",
      "PAYMENT_PROVIDER_STATUS_INVALID",
    );
  }
  return expectedAmount;
}

export async function initializePayment({ orderId, buyerId, email }) {
  const reference = `hl_${randomUUID().replaceAll("-", "")}`;
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  const { payment, order } = await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: orderId } });
    if (!order || order.buyerId !== buyerId) {
      throw paymentError("Order was not found", "PAYMENT_ORDER_NOT_FOUND", 404);
    }
    if (["CANCELLED", "DELIVERED", "DISPUTED"].includes(order.status)) {
      throw paymentError(
        "This order cannot accept payment",
        "PAYMENT_ORDER_STATUS_INVALID",
      );
    }
    const existing = await tx.payment.findFirst({
      where: {
        orderId,
        status: { in: ["INITIATED", "PENDING"] },
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });
    if (existing) {
      throw paymentError(
        "An active payment already exists for this order",
        "PAYMENT_ALREADY_ACTIVE",
      );
    }
    const amount = getOrderAmountInMinorUnits(order).toString();
    const payment = await tx.payment.create({
      data: {
        orderId,
        buyerId,
        provider: "PAYSTACK",
        providerPaymentId: reference,
        amount,
        currency: order.currency,
        status: "INITIATED",
        expiresAt,
      },
    });
    return { payment, order };
  });

  const provider = registry.get("PAYSTACK");
  const checkout = await provider.initializeTransaction({
    reference: payment.providerPaymentId,
    amount: String(payment.amount),
    currency: order.currency,
    email,
    metadata: { buyerId: order.buyerId },
  });
  return { checkoutUrl: checkout.authorization_url };
}

export async function recordProviderPayment({
  provider,
  providerPaymentId,
  orderId,
  verifiedPayment,
  metadata = null,
}) {
  if (!verifiedPayment) {
    throw paymentError(
      "Provider payment must be verified before recording",
      "PAYMENT_VERIFICATION_REQUIRED",
      400,
    );
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.payment.findFirst({
        where: { provider, providerPaymentId },
      });
      if (!existing) {
        throw paymentError(
          "Payment must be initialized before it can be captured",
          "PAYMENT_INITIATION_REQUIRED",
          409,
        );
      }
      const order = await tx.order.findUnique({
        where: { id: existing.orderId },
      });
      if (!order) {
        throw paymentError(
          "Order was not found",
          "PAYMENT_ORDER_NOT_FOUND",
          404,
        );
      }
      const expectedAmount = assertProviderPaymentMatchesOrder({
        order,
        providerPayment: verifiedPayment,
      });
      if (!["INITIATED", "PENDING"].includes(existing.status)) {
        return { payment: existing, replayed: true };
      }

      const transition = await tx.payment.updateMany({
        where: { id: existing.id, status: { in: ["INITIATED", "PENDING"] } },
        data: {
          buyerId: order.buyerId,
          amount: expectedAmount.toString(),
          currency: order.currency,
          status: "CAPTURED",
          metadata: metadata ?? verifiedPayment.metadata ?? null,
          authorizedAt: new Date(),
          capturedAt: new Date(),
        },
      });
      if (transition.count !== 1) {
        return { payment: existing, replayed: true };
      }

      await tx.escrow.create({
        data: {
          orderId: existing.orderId,
          paymentId: existing.id,
          provider,
          amount: expectedAmount.toString(),
          currency: order.currency,
          status: "FUNDED",
          fundedAt: new Date(),
        },
      });
      return {
        payment: {
          ...existing,
          status: "CAPTURED",
          amount: expectedAmount.toString(),
        },
        replayed: false,
      };
    });
  } catch (error) {
    if (error?.code !== "P2002") throw error;
    const existing = await prisma.payment.findFirst({
      where: { provider, providerPaymentId },
    });
    if (
      existing &&
      existing.orderId === orderId &&
      String(existing.amount) === String(verifiedPayment.amount)
    ) {
      return { payment: existing, replayed: true };
    }
    throw paymentError(
      "Provider payment reference conflicts with this order",
      "PAYMENT_REFERENCE_CONFLICT",
      409,
    );
  }
}

export async function requestPayout({ orderId, now = new Date() }) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: orderId } });
    if (!order || order.status !== "DELIVERED") {
      throw paymentError(
        "Payout is available only after verified delivery",
        "PAYOUT_DELIVERY_REQUIRED",
      );
    }
    if (!order.protectionEndsAt || order.protectionEndsAt > now) {
      throw paymentError(
        "The buyer protection window is still active",
        "PAYOUT_PROTECTION_ACTIVE",
      );
    }
    const dispute = await tx.dispute.findFirst({
      where: { orderId, status: { in: ["OPEN", "UNDER_REVIEW"] } },
    });
    if (dispute) {
      throw paymentError(
        "Payout is frozen while the order is disputed",
        "PAYOUT_DISPUTED",
      );
    }
    const existing = await tx.payout.findUnique({ where: { orderId } });
    if (existing) return { payout: existing, replayed: true };

    const payment = await tx.payment.findFirst({
      where: { orderId, status: { in: ["CAPTURED", "HELD"] } },
      orderBy: { createdAt: "desc" },
    });
    if (!payment) {
      throw paymentError(
        "No protected payment is eligible for payout",
        "PAYOUT_PAYMENT_REQUIRED",
      );
    }
    await tx.payment.update({
      where: { id: payment.id },
      data: { status: "RELEASE_PENDING" },
    });
    await tx.escrow.updateMany({
      where: { paymentId: payment.id, status: { in: ["FUNDED", "FROZEN"] } },
      data: { status: "RELEASED", releasedAt: now },
    });
    const payout = await tx.payout.create({
      data: {
        orderId,
        paymentId: payment.id,
        farmerId: order.farmerId,
        provider: payment.provider,
        amount: payment.amount,
        currency: payment.currency,
      },
    });
    return { payout, replayed: false };
  });
}

export async function requestRefund({ disputeId, adminId, reason }) {
  if (!adminId) {
    throw paymentError(
      "An admin actor is required to request a refund",
      "REFUND_ADMIN_REQUIRED",
      403,
    );
  }
  return prisma.$transaction(async (tx) => {
    const dispute = await tx.dispute.findUnique({ where: { id: disputeId } });
    if (!dispute || dispute.status !== "RESOLVED") {
      throw paymentError(
        "Only resolved disputes can be refunded",
        "REFUND_DISPUTE_REQUIRED",
      );
    }
    const payment = await tx.payment.findFirst({
      where: {
        orderId: dispute.orderId,
        status: { in: ["HELD", "REFUND_PENDING"] },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!payment)
      throw paymentError(
        "No protected payment is available for refund",
        "REFUND_PAYMENT_REQUIRED",
      );
    const existing = await tx.refund.findFirst({
      where: {
        paymentId: payment.id,
        status: { in: ["PENDING", "PROCESSING", "SUCCEEDED"] },
      },
    });
    if (existing) return { refund: existing, replayed: true };
    const refund = await tx.refund.create({
      data: {
        orderId: dispute.orderId,
        paymentId: payment.id,
        provider: payment.provider,
        amount: payment.amount,
        currency: payment.currency,
        reason,
      },
    });
    await tx.payment.update({
      where: { id: payment.id },
      data: { status: "REFUND_PENDING" },
    });
    await tx.escrow.updateMany({
      where: { paymentId: payment.id, status: { in: ["FUNDED", "FROZEN"] } },
      data: { status: "REFUNDED" },
    });
    await tx.auditLog.create({
      data: {
        actorId: adminId,
        action: "REFUND_REQUESTED",
        entityType: "Refund",
        entityId: refund.id,
        metadata: { disputeId, reason },
      },
    });
    return { refund, replayed: false };
  });
}

export function getPaymentProvider(provider) {
  return registry.get(provider);
}

export { PROTECTION_WINDOW_MS };
