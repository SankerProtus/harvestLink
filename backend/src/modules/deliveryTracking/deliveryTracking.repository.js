import { Prisma } from "../../generated/client/index.js";
import { prisma } from "../../common/utils/prismaClient.js";
import { ORDER_STATUS } from "./deliveryTracking.constants.js";
import { LISTING_STATUS } from "../marketplace/marketplace.constants.js";
import {
  decrementListingQuantityActive,
  incrementListingQuantity,
} from "../marketplace/marketplace.repository.js";

function toDecimal(value) {
  return new Prisma.Decimal(String(value));
}

// Create / Update / Find
export async function createOrder(data) {
  return prisma.order.create({ data });
}

/**
 * Creates a PENDING order under a row lock on the listing, enforcing ACTIVE
 * status, self-order prevention, and pending-order demand against stock.
 */
export async function createOrderWithListingLock({
  listingId,
  buyerId,
  quantity,
  pricePerUnitAtOrder,
}) {
  const requested = toDecimal(quantity);

  return prisma.$transaction(async (tx) => {
    const rows = await tx.$queryRaw`
      SELECT id, "farmerId", quantity, status, title, "quantityUnit"
      FROM listings
      WHERE id = ${listingId}::uuid
      FOR UPDATE
    `;

    const listing = rows[0];
    if (!listing) {
      return { ok: false, reason: "NOT_FOUND" };
    }

    if (listing.farmerId === buyerId) {
      return { ok: false, reason: "SELF_ORDER" };
    }

    if (listing.status !== LISTING_STATUS.ACTIVE) {
      return { ok: false, reason: "NOT_ACTIVE", listingStatus: listing.status };
    }

    const pendingAgg = await tx.order.aggregate({
      where: { listingId, status: ORDER_STATUS.PENDING },
      _sum: { quantity: true },
    });

    const pendingQty = pendingAgg._sum.quantity
      ? toDecimal(pendingAgg._sum.quantity)
      : new Prisma.Decimal(0);
    const available = toDecimal(listing.quantity);

    if (available.lessThan(pendingQty.add(requested))) {
      return { ok: false, reason: "INSUFFICIENT" };
    }

    const order = await tx.order.create({
      data: {
        listingId,
        buyerId,
        farmerId: listing.farmerId,
        quantity: requested,
        pricePerUnitAtOrder,
        status: ORDER_STATUS.PENDING,
      },
    });

    return {
      ok: true,
      order,
      listing: {
        id: listing.id,
        farmerId: listing.farmerId,
        title: listing.title,
        quantityUnit: listing.quantityUnit,
      },
    };
  });
}

/**
 * Applies an order status transition and inventory side-effects in one transaction.
 */
export async function applyOrderStatusTransition({
  orderId,
  fromStatus,
  toStatus,
  inventoryAction,
}) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: orderId } });
    if (!order || order.status !== fromStatus) {
      return { ok: false, reason: "INVALID_TRANSITION" };
    }

    if (inventoryAction === "confirm") {
      const listing = await decrementListingQuantityActive(
        order.listingId,
        order.quantity,
        tx,
      );
      if (!listing) {
        return { ok: false, reason: "INSUFFICIENT" };
      }
    } else if (inventoryAction === "release") {
      const listing = await incrementListingQuantity(
        order.listingId,
        order.quantity,
        tx,
      );
      if (!listing) {
        return { ok: false, reason: "LISTING_NOT_FOUND" };
      }
    }

    const updated = await tx.order.updateMany({
      where: { id: orderId, status: fromStatus },
      data: {
        status: toStatus,
        ...(toStatus === ORDER_STATUS.CONFIRMED
          ? { confirmedAt: new Date() }
          : {}),
      },
    });

    if (updated.count === 0) {
      return { ok: false, reason: "INVALID_TRANSITION" };
    }

    const updatedOrder = await tx.order.findUnique({ where: { id: orderId } });

    return { ok: true, order: updatedOrder };
  });
}

export async function findOrderById(id) {
  return prisma.order.findUnique({ where: { id } });
}

const ORDER_PAYMENT_INCLUDE = {
  escrow: {
    select: {
      status: true,
      amount: true,
      currency: true,
      fundedAt: true,
      releasedAt: true,
    },
  },
  payments: {
    orderBy: { createdAt: "desc" },
    take: 1,
    select: { status: true, provider: true },
  },
};

export async function findOrderByIdWithRelations(id) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      listing: { include: { crop: true } },
      buyer: true,
      farmer: true,
      ...ORDER_PAYMENT_INCLUDE,
    },
  });
}

export async function updateOrderStatus(id, status) {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
}

export async function updateOrderLocation(
  id,
  { latitude, longitude, locationReportedAt },
) {
  return prisma.order.update({
    where: { id },
    data: {
      latestLatitude: latitude,
      latestLongitude: longitude,
      locationReportedAt,
    },
  });
}

// List / Search

export async function listOrdersByBuyerId(buyerId, filters) {
  const { status, skip = 0, take = 20 } = filters;

  const where = {
    buyerId,
    ...(status ? { status: Array.isArray(status) ? { in: status } : status } : {}),
  };

  const [items, totalCount] = await prisma.$transaction([
    prisma.order.findMany({
      where,
      include: {
        listing: true,
        farmer: true,
        ...ORDER_PAYMENT_INCLUDE,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.order.count({ where }),
  ]);

  return { items, totalCount };
}

export async function listOrdersByFarmerId(farmerId, filters) {
  const { status, skip = 0, take = 20 } = filters;

  const where = {
    farmerId,
    ...(status ? { status: Array.isArray(status) ? { in: status } : status } : {}),
  };

  const [items, totalCount] = await prisma.$transaction([
    prisma.order.findMany({
      where,
      include: {
        listing: true,
        buyer: true,
        ...ORDER_PAYMENT_INCLUDE,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.order.count({ where }),
  ]);

  return { items, totalCount };
}

export async function getFarmerSummaryData(farmerId) {
  const [statusRows, payoutRows, escrowRows] = await Promise.all([
    prisma.order.groupBy({
      by: ["status"],
      where: { farmerId },
      _count: { _all: true },
    }),
    prisma.payout.groupBy({
      by: ["currency", "status"],
      where: { farmerId },
      _sum: { amount: true },
    }),
    prisma.escrow.groupBy({
      by: ["currency", "status"],
      where: { status: { in: ["FUNDED", "FROZEN"] }, order: { farmerId } },
      _sum: { amount: true },
    }),
  ]);
  return { statusRows, payoutRows, escrowRows };
}
