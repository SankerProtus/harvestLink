import { prisma } from "../../common/utils/prismaClient.js";
import { AppError } from "../../errors/AppError.js";
import {
  findDisputeById,
  listDisputesForAdmin,
  markDisputeUnderReview,
  resolveDisputeRecord,
} from "../trust/trust.repository.js";

const DAY_MS = 24 * 60 * 60 * 1000;

export async function getAdminOverview() {
  const since7d = new Date(Date.now() - 7 * DAY_MS);
  const unresolved = { in: ["OPEN", "UNDER_REVIEW"] };

  const [
    users,
    farmers,
    buyers,
    activeListings,
    orders,
    pendingVerifications,
    flaggedListings,
    openDisputes,
    underReviewDisputes,
    heldPayments,
    refundPending,
    auditEvents,
    openReports,
    newUsers7d,
    orders7d,
    deliveredOrders,
    oldestDispute,
    oldestVerification,
    oldestReport,
    escrowTotals,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "FARMER" } }),
    prisma.user.count({ where: { role: "BUYER" } }),
    prisma.listing.count({ where: { status: "ACTIVE" } }),
    prisma.order.count(),
    prisma.verificationRecord.count({ where: { status: "PENDING" } }),
    prisma.listing.count({ where: { priceReviewRequired: true, status: "ACTIVE" } }),
    prisma.dispute.count({ where: { status: "OPEN" } }),
    prisma.dispute.count({ where: { status: "UNDER_REVIEW" } }),
    prisma.payment.count({ where: { status: { in: ["HELD", "RELEASE_PENDING"] } } }),
    prisma.payment.count({ where: { status: "REFUND_PENDING" } }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        action: true,
        entityType: true,
        createdAt: true,
        actor: { select: { fullName: true } },
      },
    }),
    prisma.userReport.count({ where: { status: unresolved } }),
    prisma.user.count({ where: { createdAt: { gte: since7d }, deletedAt: null } }),
    prisma.order.count({ where: { createdAt: { gte: since7d } } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.dispute.findFirst({
      where: { status: unresolved },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    }),
    prisma.verificationRecord.findFirst({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    }),
    prisma.userReport.findFirst({
      where: { status: unresolved },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    }),
    prisma.escrow.groupBy({
      by: ["currency", "status"],
      where: { status: { in: ["FUNDED", "FROZEN", "RELEASED"] } },
      _sum: { amount: true },
    }),
  ]);

  return {
    counts: {
      users,
      farmers,
      buyers,
      activeListings,
      orders,
      pendingVerifications,
      flaggedListings,
      openDisputes,
      underReviewDisputes,
      heldPayments,
      refundPending,
      openReports,
    },
    trends: { newUsers7d, orders7d, deliveredOrders },
    oldest: {
      dispute: oldestDispute?.createdAt?.toISOString() ?? null,
      verification: oldestVerification?.createdAt?.toISOString() ?? null,
      report: oldestReport?.createdAt?.toISOString() ?? null,
    },
    funds: escrowTotals.map((row) => ({
      currency: row.currency,
      status: row.status,
      amount: Number(row._sum.amount ?? 0),
    })),
    auditEvents,
    generatedAt: new Date().toISOString(),
  };
}

export async function listAdminUsers() {
  return prisma.user.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      fullName: true,
      role: true,
      phone: true,
      profileImageUrl: true,
      lastLoginAt: true,
      phoneVerifiedAt: true,
      verificationLevel: true,
      accountStatus: true,
      createdAt: true,
      _count: { select: { listings: true, buyerOrders: true, farmerOrders: true } },
    },
  });
}

export async function setUserAccountStatus({ userId, adminId, status, reason }) {
  if (userId === adminId) {
    throw new AppError("You cannot change your own account status", {
      statusCode: 400, code: "ADMIN_SELF_ACTION", isOperational: true,
    });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, accountStatus: true, deletedAt: true, phoneVerifiedAt: true },
  });
  if (!user || user.deletedAt) {
    throw new AppError("User not found", {
      statusCode: 404, code: "ADMIN_USER_NOT_FOUND", isOperational: true,
    });
  }
  if (user.role === "ADMIN") {
    throw new AppError("Admin accounts cannot be changed here", {
      statusCode: 403, code: "ADMIN_TARGET_FORBIDDEN", isOperational: true,
    });
  }
  if (status === "SUSPENDED" && user.accountStatus === "SUSPENDED") {
    throw new AppError("This account is already suspended", {
      statusCode: 409, code: "ADMIN_USER_INVALID_STATE", isOperational: true,
    });
  }
  if (status === "ACTIVE" && user.accountStatus !== "SUSPENDED") {
    throw new AppError("Only suspended accounts can be reactivated", {
      statusCode: 409, code: "ADMIN_USER_INVALID_STATE", isOperational: true,
    });
  }

  // Never let reactivation skip phone verification.
  const nextStatus =
    status === "ACTIVE" && !user.phoneVerifiedAt ? "PENDING_VERIFICATION" : status;

  return prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id: userId },
      data: { accountStatus: nextStatus },
      select: { id: true, accountStatus: true },
    });
    if (nextStatus === "SUSPENDED") {
      await tx.refreshToken.deleteMany({ where: { userId } });
    }
    await tx.auditLog.create({
      data: {
        actorId: adminId,
        action: status === "SUSPENDED" ? "USER_SUSPENDED" : "USER_REACTIVATED",
        entityType: "USER",
        entityId: userId,
        metadata: { reason, previousStatus: user.accountStatus },
      },
    });
    return updated;
  });
}

export async function listAdminListings() {
  return prisma.listing.findMany({
    orderBy: { updatedAt: "desc" },
    take: 100,
    include: {
      crop: { select: { name: true } },
      farmer: { select: { fullName: true, verificationLevel: true } },
      _count: { select: { orders: true, interests: true } },
    },
  });
}

export async function listAdminOrders() {
  return prisma.order.findMany({
    orderBy: { updatedAt: "desc" },
    take: 100,
    include: {
      listing: { select: { title: true } },
      buyer: { select: { fullName: true } },
      farmer: { select: { fullName: true } },
      payments: { select: { status: true, amount: true, currency: true }, take: 1, orderBy: { createdAt: "desc" } },
      disputes: { where: { status: { in: ["OPEN", "UNDER_REVIEW"] } }, select: { id: true }, take: 1 },
    },
  });
}

export async function listAdminPayments() {
  return prisma.payment.findMany({
    orderBy: { updatedAt: "desc" },
    take: 100,
    include: {
      buyer: { select: { fullName: true } },
      order: { select: { id: true, listing: { select: { title: true } } } },
      escrow: { select: { status: true } },
      refunds: { select: { status: true }, take: 1, orderBy: { createdAt: "desc" } },
      payouts: { select: { status: true }, take: 1, orderBy: { createdAt: "desc" } },
    },
  });
}

export async function listAdminAuditLogs() {
  return prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { actor: { select: { fullName: true, role: true } } },
  });
}

export async function listPendingVerificationRecords() {
  return prisma.verificationRecord.findMany({
    where: { status: "PENDING" },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          role: true,
          phone: true,
          verificationLevel: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function resolveVerificationRecord({
  recordId,
  adminId,
  decision,
  notes,
}) {
  const record = await prisma.verificationRecord.findUnique({
    where: { id: recordId },
  });
  if (!record || record.status !== "PENDING") {
    throw new AppError("Verification record not found or already resolved", {
      statusCode: 404,
      code: "ADMIN_VERIFICATION_NOT_FOUND",
      isOperational: true,
    });
  }

  const status = decision === "APPROVE" ? "APPROVED" : "REJECTED";

  return prisma.$transaction(async (tx) => {
    const updated = await tx.verificationRecord.update({
      where: { id: recordId },
      data: {
        status,
        notes: notes ?? record.notes,
        reviewedById: adminId,
        reviewedAt: new Date(),
      },
    });

    if (decision === "APPROVE") {
      const user = await tx.user.findUnique({
        where: { id: record.userId },
        select: { verificationLevel: true },
      });
      await tx.user.update({
        where: { id: record.userId },
        data: {
          verificationLevel: Math.max(
            user?.verificationLevel ?? 0,
            record.tierRequested,
          ),
        },
      });
    }

    await tx.auditLog.create({
      data: {
        actorId: adminId,
        action: "VERIFICATION_DECIDED",
        entityType: "VERIFICATION_RECORD",
        entityId: recordId,
        metadata: { decision, tierRequested: record.tierRequested },
      },
    });

    return updated;
  });
}

export async function listListingsPendingPriceReview() {
  return prisma.listing.findMany({
    where: { priceReviewRequired: true, status: "ACTIVE" },
    include: { crop: true, farmer: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function clearListingPriceReview({ listingId, adminId }) {
  return prisma.$transaction(async (tx) => {
    const listing = await tx.listing.update({
      where: { id: listingId },
      data: { priceReviewRequired: false },
      include: { crop: true },
    });
    await tx.auditLog.create({
      data: {
        actorId: adminId,
        action: "PRICE_REVIEW_CLEARED",
        entityType: "LISTING",
        entityId: listingId,
      },
    });
    return listing;
  });
}

export function listOpenDisputes() {
  return listDisputesForAdmin();
}

export async function getDisputeForAdmin(disputeId) {
  const dispute = await findDisputeById(disputeId);
  if (!dispute) {
    throw new AppError("Dispute not found", {
      statusCode: 404,
      code: "ADMIN_DISPUTE_NOT_FOUND",
      isOperational: true,
    });
  }
  return dispute;
}

export async function startDisputeReview({ disputeId }) {
  const dispute = await findDisputeById(disputeId);
  if (!dispute) {
    throw new AppError("Dispute not found", {
      statusCode: 404,
      code: "ADMIN_DISPUTE_NOT_FOUND",
      isOperational: true,
    });
  }
  if (dispute.status !== "OPEN") {
    throw new AppError("Only open disputes can be marked under review", {
      statusCode: 409,
      code: "ADMIN_DISPUTE_INVALID_STATE",
      isOperational: true,
    });
  }
  return markDisputeUnderReview(disputeId);
}

export async function resolveAdminDispute({ disputeId, adminId, outcome, resolution }) {
  const dispute = await findDisputeById(disputeId);
  if (!dispute) {
    throw new AppError("Dispute not found", {
      statusCode: 404,
      code: "ADMIN_DISPUTE_NOT_FOUND",
      isOperational: true,
    });
  }
  if (!["OPEN", "UNDER_REVIEW"].includes(dispute.status)) {
    throw new AppError("This dispute has already been resolved", {
      statusCode: 409,
      code: "ADMIN_DISPUTE_INVALID_STATE",
      isOperational: true,
    });
  }
  return resolveDisputeRecord({
    disputeId,
    resolvedById: adminId,
    outcome,
    resolution,
  });
}
