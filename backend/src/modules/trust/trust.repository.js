import { prisma } from "../../common/utils/prismaClient.js";
import { incrementListingQuantity } from "../marketplace/marketplace.repository.js";
import { TrustConflictError } from "./trust.errors.js";
import { getBuyerProtectionWindowMs } from "../../common/config/protection.config.js";

export function findOrder(orderId) {
  return prisma.order.findUnique({ where: { id: orderId } });
}

export function findPendingCancellation(orderId) {
  return prisma.cancellationRequest.findFirst({
    where: { orderId, status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });
}

export function createHandoverCode(data) {
  return prisma.deliveryHandoverCode.upsert({
    where: { orderId: data.orderId },
    create: data,
    update: { codeHash: data.codeHash, expiresAt: data.expiresAt, attempts: 0, usedAt: null },
  });
}

export function findHandoverCode(orderId) {
  return prisma.deliveryHandoverCode.findUnique({ where: { orderId } });
}

export function incrementHandoverAttempts(id) {
  return prisma.deliveryHandoverCode.update({
    where: { id },
    data: { attempts: { increment: 1 } },
  });
}

export function markHandoverUsed(orderId, usedAt) {
  return prisma.deliveryHandoverCode.updateMany({
    where: { orderId, usedAt: null },
    data: { usedAt },
  });
}

export function consumeHandoverCode(orderId, usedAt) {
  return prisma.$transaction(async (tx) => {
    const consumed = await tx.deliveryHandoverCode.updateMany({
      where: { orderId, usedAt: null },
      data: { usedAt },
    });
    if (consumed.count !== 1) return null;
    const updated = await tx.order.updateMany({
      where: { id: orderId, status: "IN_TRANSIT" },
      data: {
        status: "DELIVERED",
        deliveryVerifiedAt: usedAt,
        protectionEndsAt: new Date(usedAt.getTime() + getBuyerProtectionWindowMs()),
      },
    });
    if (updated.count !== 1) {
      throw new TrustConflictError("The order was already handed over or changed");
    }
    await tx.payment.updateMany({
      where: { orderId, status: { in: ["CAPTURED", "AUTHORIZED", "HELD"] } },
      data: { status: "HELD" },
    });
    await tx.auditLog.create({
      data: {
        action: "DELIVERY_VERIFIED",
        entityType: "ORDER",
        entityId: orderId,
        metadata: { protectionEndsAt: new Date(usedAt.getTime() + getBuyerProtectionWindowMs()).toISOString() },
      },
    });
    return updated;
  });
}

export function createCancellationRequest(data) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: data.orderId } });
    if (!order || order.status !== "CONFIRMED") return null;

    const existing = await tx.cancellationRequest.findFirst({
      where: { orderId: data.orderId, status: "PENDING" },
    });
    if (existing) return { conflict: true, request: existing };

    const request = await tx.cancellationRequest.create({ data });
    await tx.order.update({
      where: { id: data.orderId },
      data: { status: "CANCELLATION_REQUESTED" },
    });
    return { conflict: false, request };
  });
}

export function decideCancellationRequest({ requestId, orderId, decisionById, status }) {
  return prisma.$transaction(async (tx) => {
    const request = await tx.cancellationRequest.findUnique({ where: { id: requestId } });
    if (!request || request.orderId !== orderId || request.status !== "PENDING") return null;

    const order = await tx.order.findUnique({ where: { id: orderId } });
    if (!order || (order.buyerId !== decisionById && order.farmerId !== decisionById)) return null;
    if (order.status !== "CANCELLATION_REQUESTED") return null;

    const updatedRequest = await tx.cancellationRequest.update({
      where: { id: requestId },
      data: { status, decisionById, decidedAt: new Date() },
    });

    if (status === "APPROVED") {
      const listing = await incrementListingQuantity(order.listingId, order.quantity, tx);
      if (!listing) return null;
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: "CANCELLED" },
      });
      return { request: updatedRequest, order: updatedOrder };
    }

    const updatedOrder = await tx.order.update({
      where: { id: orderId },
      data: { status: "CONFIRMED" },
    });
    return { request: updatedRequest, order: updatedOrder };
  });
}

export function createDispute(data) {
  return prisma.$transaction(async (tx) => {
    const dispute = await tx.dispute.create({
      data: {
        ...data,
        evidenceExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    });
    const order = await tx.order.updateMany({
      where: {
        id: data.orderId,
        status: { in: ["IN_TRANSIT", "DELIVERED"] },
      },
      data: { status: "DISPUTED" },
    });
    if (order.count !== 1) {
      throw new TrustConflictError("The order changed before the dispute could be opened");
    }
    await tx.payment.updateMany({
      where: { orderId: data.orderId, status: { in: ["CAPTURED", "AUTHORIZED", "HELD"] } },
      data: { status: "HELD" },
    });
    await tx.escrow.updateMany({
      where: { orderId: data.orderId, status: { in: ["PENDING", "FUNDED"] } },
      data: { status: "FROZEN" },
    });
    await tx.auditLog.create({
      data: {
        actorId: data.openedById,
        action: "DISPUTE_OPENED",
        entityType: "ORDER",
        entityId: data.orderId,
        metadata: { disputeId: dispute.id, reason: data.reason },
      },
    });
    return dispute;
  });
}

export function findOpenDisputeForOrder(orderId) {
  return prisma.dispute.findFirst({
    where: {
      orderId,
      status: { in: ["OPEN", "UNDER_REVIEW"] },
    },
    orderBy: { createdAt: "desc" },
  });
}

export function listDisputesForUser(userId) {
  return prisma.dispute.findMany({
    where: { OR: [{ openedById: userId }, { order: { buyerId: userId } }, { order: { farmerId: userId } }] },
    orderBy: { createdAt: "desc" },
    include: {
      order: {
        select: {
          id: true,
          status: true,
          listing: { select: { title: true } },
        },
      },
    },
  });
}

export function findPendingCancellationForOrder(orderId) {
  return prisma.cancellationRequest.findFirst({
    where: { orderId, status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });
}

export function listDisputesForAdmin() {
  return prisma.dispute.findMany({
    where: { status: { in: ["OPEN", "UNDER_REVIEW"] } },
    include: {
      order: {
        include: {
          buyer: { select: { id: true, fullName: true, phone: true } },
          farmer: { select: { id: true, fullName: true, phone: true } },
          listing: { select: { id: true, title: true } },
        },
      },
      openedBy: { select: { id: true, fullName: true, role: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export function findDisputeById(disputeId) {
  return prisma.dispute.findUnique({
    where: { id: disputeId },
    include: {
      order: {
        include: {
          buyer: { select: { id: true, fullName: true, phone: true } },
          farmer: { select: { id: true, fullName: true, phone: true } },
          listing: { select: { id: true, title: true } },
        },
      },
      openedBy: { select: { id: true, fullName: true, role: true } },
      resolvedBy: { select: { id: true, fullName: true } },
    },
  });
}

export function resolveDisputeRecord({ disputeId, resolvedById, outcome, resolution }) {
  return prisma.$transaction(async (tx) => {
    const dispute = await tx.dispute.findUnique({ where: { id: disputeId } });
    if (!dispute || dispute.status === "RESOLVED") return null;
    const now = new Date();
    const updated = await tx.dispute.update({
      where: { id: disputeId },
      data: {
        status: "RESOLVED",
        resolution: `${outcome}: ${resolution}`,
        resolvedById,
        resolvedAt: now,
      },
    });
    if (outcome === "BUYER") {
      const payment = await tx.payment.findFirst({
        where: { orderId: dispute.orderId, status: { in: ["HELD", "RELEASE_PENDING"] } },
        orderBy: { createdAt: "desc" },
      });
      if (payment) {
        await tx.refund.upsert({
          where: { paymentId: payment.id },
          create: {
            orderId: dispute.orderId,
            paymentId: payment.id,
            provider: payment.provider,
            amount: payment.amount,
            currency: payment.currency,
            reason: resolution,
          },
          update: { reason: resolution },
        });
      }
      await tx.payment.updateMany({
        where: { orderId: dispute.orderId, status: { in: ["HELD", "RELEASE_PENDING"] } },
        data: { status: "REFUND_PENDING" },
      });
      await tx.escrow.updateMany({
        where: { orderId: dispute.orderId, status: { in: ["FUNDED", "FROZEN"] } },
        data: { status: "REFUNDED" },
      });
    } else {
      await tx.order.updateMany({
        where: { id: dispute.orderId, status: "DISPUTED" },
        data: { status: "DELIVERED" },
      });
    }
    await tx.auditLog.create({
      data: {
        actorId: resolvedById,
        action: "DISPUTE_RESOLVED",
        entityType: "DISPUTE",
        entityId: disputeId,
        metadata: { outcome },
      },
    });
    return updated;
  });
}

export function markDisputeUnderReview(disputeId) {
  return prisma.dispute.update({
    where: { id: disputeId },
    data: { status: "UNDER_REVIEW" },
  });
}

export function createVerificationRecord(data) {
  return prisma.verificationRecord.create({ data });
}

export function findPendingVerification(userId) {
  return prisma.verificationRecord.findFirst({ where: { userId, status: "PENDING" } });
}

export function upsertReliabilityMetric({ userId, metricType, periodStart, periodEnd, value, sampleSize }) {
  return prisma.reliabilityMetric.upsert({
    where: { userId_metricType_periodStart: { userId, metricType, periodStart } },
    create: { userId, metricType, periodStart, periodEnd, value, sampleSize },
    update: { periodEnd, value, sampleSize },
  });
}

export function listReliabilityMetrics(userId) {
  return prisma.reliabilityMetric.findMany({
    where: { userId },
    orderBy: { periodStart: "desc" },
  });
}
