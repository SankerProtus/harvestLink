import { prisma } from "../../common/utils/prismaClient.js";

export async function findOrderById(orderId) {
  return prisma.order.findUnique({ where: { id: orderId } });
}

export async function findReviewByOrderId(orderId) {
  return prisma.review.findUnique({ where: { orderId } });
}

export async function createReview({
  orderId,
  farmerId,
  buyerId,
  rating,
  comment,
}) {
  return prisma.review.create({
    data: { orderId, farmerId, buyerId, rating, comment: comment ?? null },
  });
}

// Aggregates real rating + review count per farmer in a single grouped
// query — powers the "★ 4.8 (24)" shown on listings, computed from
// actual delivered-order reviews rather than any invented number.
export async function getRatingSummaryForFarmers(farmerIds) {
  if (!farmerIds || farmerIds.length === 0) return new Map();

  const rows = await prisma.review.groupBy({
    by: ["farmerId"],
    where: { farmerId: { in: farmerIds } },
    _avg: { rating: true },
    _count: { _all: true },
  });

  const summary = new Map();
  for (const row of rows) {
    summary.set(row.farmerId, {
      rating: row._avg.rating,
      reviewCount: row._count._all,
    });
  }
  return summary;
}
