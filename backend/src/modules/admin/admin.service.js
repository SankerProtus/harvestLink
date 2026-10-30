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
  const since14d = new Date(Date.now() - 14 * DAY_MS);
  // Start of the 7-day bar chart: midnight UTC, six days before today.
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  const seriesStart = new Date(todayStart.getTime() - 6 * DAY_MS);
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
    newUsersPrev7d,
    ordersPrev7d,
    ordersByDayRows,
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
    prisma.user.count({
      where: { createdAt: { gte: since14d, lt: since7d }, deletedAt: null },
    }),
    prisma.order.count({ where: { createdAt: { gte: since14d, lt: since7d } } }),
    prisma.$queryRaw`
      SELECT to_char("createdAt", 'YYYY-MM-DD') AS day, COUNT(*)::int AS count
      FROM "orders"
      WHERE "createdAt" >= ${seriesStart}
      GROUP BY 1
    `,
  ]);

  const ordersByDayCounts = new Map(
    ordersByDayRows.map((row) => [row.day, Number(row.count)]),
  );
  const ordersByDay = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(seriesStart.getTime() + i * DAY_MS)
      .toISOString()
      .slice(0, 10);
    return { date, count: ordersByDayCounts.get(date) ?? 0 };
  });

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
    trends: {
      newUsers7d,
      orders7d,
      deliveredOrders,
      newUsersPrev7d,
      ordersPrev7d,
      ordersByDay,
    },
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

function adminRecordNotFound(entity, code) {
  return new AppError(`${entity} not found`, {
    statusCode: 404,
    code,
    isOperational: true,
  });
}

const PARTY_SELECT = {
  id: true,
  fullName: true,
  phone: true,
  verificationLevel: true,
};

/**
 * Full read-only view of one order for the admin detail screen. Handover
 * codes expose only their state (never the hash), and payment metadata is
 * deliberately left out.
 */
export async function getAdminOrderDetail(orderId) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      listing: {
        select: {
          id: true,
          title: true,
          location: true,
          quantityUnit: true,
          crop: { select: { name: true } },
        },
      },
      buyer: { select: PARTY_SELECT },
      farmer: { select: PARTY_SELECT },
      payments: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          provider: true,
          status: true,
          amount: true,
          currency: true,
          createdAt: true,
        },
      },
      escrow: {
        select: {
          status: true,
          amount: true,
          currency: true,
          fundedAt: true,
          releasedAt: true,
        },
      },
      refunds: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          amount: true,
          currency: true,
          reason: true,
          processedAt: true,
          createdAt: true,
        },
      },
      payouts: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          amount: true,
          currency: true,
          failureReason: true,
          processedAt: true,
          createdAt: true,
        },
      },
      disputes: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          reason: true,
          createdAt: true,
          resolvedAt: true,
        },
      },
      cancellationRequests: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          reason: true,
          createdAt: true,
          decidedAt: true,
          requester: { select: { fullName: true, role: true } },
        },
      },
      review: { select: { rating: true, comment: true, createdAt: true } },
      handoverCode: {
        select: { expiresAt: true, usedAt: true, attempts: true },
      },
    },
  });
  if (!order) throw adminRecordNotFound("Order", "ADMIN_ORDER_NOT_FOUND");
  return order;
}

export async function getAdminPaymentDetail(paymentId) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    select: {
      id: true,
      orderId: true,
      provider: true,
      providerPaymentId: true,
      amount: true,
      currency: true,
      status: true,
      authorizedAt: true,
      capturedAt: true,
      failedAt: true,
      createdAt: true,
      updatedAt: true,
      buyer: { select: PARTY_SELECT },
      order: {
        select: {
          id: true,
          status: true,
          quantity: true,
          pricePerUnitAtOrder: true,
          protectionEndsAt: true,
          listing: { select: { title: true } },
          farmer: { select: PARTY_SELECT },
        },
      },
      escrow: {
        select: {
          status: true,
          provider: true,
          providerEscrowId: true,
          amount: true,
          currency: true,
          fundedAt: true,
          releasedAt: true,
        },
      },
      refunds: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          providerRefundId: true,
          amount: true,
          currency: true,
          reason: true,
          processedAt: true,
          createdAt: true,
        },
      },
      payouts: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          providerPayoutId: true,
          amount: true,
          currency: true,
          failureReason: true,
          processedAt: true,
          createdAt: true,
        },
      },
    },
  });
  if (!payment) throw adminRecordNotFound("Payment", "ADMIN_PAYMENT_NOT_FOUND");
  return payment;
}

export async function getAdminListingDetail(listingId) {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: {
      crop: { select: { id: true, name: true, category: true } },
      farmer: {
        select: { ...PARTY_SELECT, accountStatus: true },
      },
      _count: { select: { orders: true, interests: true, savedBy: true } },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          status: true,
          quantity: true,
          pricePerUnitAtOrder: true,
          createdAt: true,
          buyer: { select: { fullName: true } },
        },
      },
    },
  });
  if (!listing) throw adminRecordNotFound("Listing", "ADMIN_LISTING_NOT_FOUND");
  return listing;
}

export async function getAdminAuditEventDetail(eventId) {
  const event = await prisma.auditLog.findUnique({
    where: { id: eventId },
    include: { actor: { select: { id: true, fullName: true, role: true } } },
  });
  if (!event) throw adminRecordNotFound("Audit event", "ADMIN_AUDIT_NOT_FOUND");

  // Other events recorded against the same record, newest first, so the
  // admin can read the history around this one.
  const related = await prisma.auditLog.findMany({
    where: {
      entityType: event.entityType,
      entityId: event.entityId,
      id: { not: event.id },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { actor: { select: { fullName: true, role: true } } },
  });

  return { ...event, related };
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
