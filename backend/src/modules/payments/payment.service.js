import { prisma } from "../../common/utils/prismaClient.js";
import { AppError } from "../../errors/AppError.js";
import { createPaymentProviderRegistry } from "./payment.provider.js";
import { getBuyerProtectionWindowMs } from "../../common/config/protection.config.js";

const registry = createPaymentProviderRegistry();
const PROTECTION_WINDOW_MS = getBuyerProtectionWindowMs();

function paymentError(message, code, statusCode = 409) {
  return new AppError(message, { statusCode, code, isOperational: true });
}

function assertProviderStatus(status) {
  if (!["CAPTURED", "FAILED", "CANCELLED"].includes(status)) {
    throw paymentError("Unsupported provider payment status", "PAYMENT_STATUS_INVALID", 400);
  }
}

export async function recordProviderPayment({
  provider,
  providerPaymentId,
  orderId,
  buyerId,
  amount,
  currency,
  status,
  metadata = null,
}) {
  assertProviderStatus(status);
  return prisma.$transaction(async (tx) => {
    const existing = await tx.payment.findFirst({
      where: { provider, providerPaymentId },
    });
    if (existing) {
      if (existing.orderId !== orderId || String(existing.amount) !== String(amount)) {
        throw paymentError("Provider payment reference conflicts with this order", "PAYMENT_REFERENCE_CONFLICT", 409);
      }
      return { payment: existing, replayed: true };
    }

    const payment = await tx.payment.create({
      data: {
        provider,
        providerPaymentId,
        orderId,
        buyerId,
        amount,
        currency,
        status: status === "CAPTURED" ? "HELD" : status,
        metadata,
        ...(status === "CAPTURED" ? { authorizedAt: new Date(), capturedAt: new Date() } : {}),
        ...(status === "FAILED" ? { failedAt: new Date() } : {}),
      },
    });

    if (status === "CAPTURED") {
      await tx.escrow.create({
        data: {
          orderId,
          paymentId: payment.id,
          provider,
          amount,
          currency,
          status: "FUNDED",
          fundedAt: new Date(),
        },
      });
    }
    return { payment, replayed: false };
  });
}

export async function requestPayout({ orderId, now = new Date() }) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: orderId } });
    if (!order || order.status !== "DELIVERED") {
      throw paymentError("Payout is available only after verified delivery", "PAYOUT_DELIVERY_REQUIRED");
    }
    if (!order.protectionEndsAt || order.protectionEndsAt > now) {
      throw paymentError("The buyer protection window is still active", "PAYOUT_PROTECTION_ACTIVE");
    }
    const dispute = await tx.dispute.findFirst({
      where: { orderId, status: { in: ["OPEN", "UNDER_REVIEW"] } },
    });
    if (dispute) {
      throw paymentError("Payout is frozen while the order is disputed", "PAYOUT_DISPUTED");
    }
    const payment = await tx.payment.findFirst({
      where: { orderId, status: "HELD" },
      orderBy: { createdAt: "desc" },
    });
    if (!payment) {
      throw paymentError("No protected payment is eligible for payout", "PAYOUT_PAYMENT_REQUIRED");
    }
    const existing = await tx.payout.findUnique({ where: { orderId } });
    if (existing) return { payout: existing, replayed: true };

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
  void adminId;
  return prisma.$transaction(async (tx) => {
    const dispute = await tx.dispute.findUnique({ where: { id: disputeId } });
    if (!dispute || dispute.status !== "RESOLVED") {
      throw paymentError("Only resolved disputes can be refunded", "REFUND_DISPUTE_REQUIRED");
    }
    const payment = await tx.payment.findFirst({
      where: { orderId: dispute.orderId, status: { in: ["HELD", "REFUND_PENDING"] } },
      orderBy: { createdAt: "desc" },
    });
    if (!payment) throw paymentError("No protected payment is available for refund", "REFUND_PAYMENT_REQUIRED");
    const existing = await tx.refund.findFirst({
      where: { paymentId: payment.id, status: { in: ["PENDING", "PROCESSING", "SUCCEEDED"] } },
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
    await tx.payment.update({ where: { id: payment.id }, data: { status: "REFUND_PENDING" } });
    await tx.escrow.updateMany({
      where: { paymentId: payment.id, status: { in: ["FUNDED", "FROZEN"] } },
      data: { status: "REFUNDED" },
    });
    return { refund, replayed: false };
  });
}

export function getPaymentProvider(provider) {
  return registry.get(provider);
}

export { PROTECTION_WINDOW_MS };
