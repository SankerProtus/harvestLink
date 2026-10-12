import { prisma } from "../../common/utils/prismaClient.js";
import { AppError } from "../../errors/AppError.js";

const ACTIVE_ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "IN_TRANSIT",
  "DISPUTED",
  "CANCELLATION_REQUESTED",
];

function fail(statusCode, code, message) {
  return new AppError(message, { statusCode, code, isOperational: true });
}

export async function deleteOwnAccount({ userId }) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, deletedAt: true },
  });
  if (!user || user.deletedAt) {
    throw fail(404, "AUTH_USER_NOT_FOUND", "Account not found");
  }
  if (user.role === "ADMIN") {
    throw fail(
      403,
      "AUTH_ADMIN_DELETE_FORBIDDEN",
      "Administrator accounts can't be deleted here. Ask another administrator.",
    );
  }

  const participant = { OR: [{ buyerId: userId }, { farmerId: userId }] };
  const [activeOrders, heldFunds, pendingPayouts] = await Promise.all([
    prisma.order.count({
      where: { ...participant, status: { in: ACTIVE_ORDER_STATUSES } },
    }),
    prisma.escrow.count({
      where: { status: { in: ["FUNDED", "FROZEN"] }, order: participant },
    }),
    prisma.payout.count({
      where: { farmerId: userId, status: { in: ["PENDING", "PROCESSING"] } },
    }),
  ]);

  if (activeOrders > 0) {
    throw fail(
      409,
      "ACCOUNT_DELETE_ACTIVE_ORDERS",
      "Finish or cancel your active orders before deleting your account.",
    );
  }
  if (heldFunds > 0 || pendingPayouts > 0) {
    throw fail(
      409,
      "ACCOUNT_DELETE_PENDING_FUNDS",
      "Some payments for your orders are still being settled. Try again once they complete.",
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.listing.updateMany({
      where: { farmerId: userId, status: "ACTIVE" },
      data: { status: "REMOVED" },
    });
    await tx.refreshToken.deleteMany({ where: { userId } });
    await tx.oAuthAccount.deleteMany({ where: { userId } });
    await tx.savedListing.deleteMany({ where: { buyerId: userId } });
    await tx.user.update({
      where: { id: userId },
      data: {
        fullName: "Deleted user",
        phone: null,
        phoneVerifiedAt: null,
        profileImageUrl: null,
        accountStatus: "DELETED",
        deletedAt: new Date(),
      },
    });
    await tx.auditLog.create({
      data: {
        actorId: userId,
        action: "USER_SELF_DELETED",
        entityType: "USER",
        entityId: userId,
        metadata: {},
      },
    });
  });

  return { deleted: true };
}