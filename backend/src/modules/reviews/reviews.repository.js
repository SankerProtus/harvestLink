import { prisma } from "../../common/utils/prismaClient.js";

export async function findOrderById(orderId) {
  return prisma.order.findUnique({ where: { id: orderId } });
}

export async function findReviewByOrderId(orderId) {
  return prisma.review.findUnique({ where: { orderId } });
}

export async function findReviewById(reviewId) {
  return prisma.review.findUnique({ where: { id: reviewId } });
}

export async function findFarmerById(farmerId) {
  return prisma.user.findFirst({
    where: { id: farmerId, role: "FARMER", deletedAt: null },
    select: { id: true, fullName: true, profileImageUrl: true },
  });
}

export async function findListingById(listingId) {
  return prisma.listing.findUnique({
    where: { id: listingId },
    select: { id: true, title: true, farmerId: true },
  });
}

const REVIEW_LIST_INCLUDE = {
  buyer: {
    select: { id: true, fullName: true, profileImageUrl: true },
  },
  order: {
    select: {
      listingId: true,
      listing: { select: { id: true, title: true } },
    },
  },
  _count: { select: { comments: true } },
};

export async function listReviewsForFarmer(farmerId, { skip, take }) {
  const [items, totalCount] = await Promise.all([
    prisma.review.findMany({
      where: { farmerId },
      include: REVIEW_LIST_INCLUDE,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.review.count({ where: { farmerId } }),
  ]);
  return { items, totalCount };
}

export async function listReviewsForListing(listingId, { skip, take }) {
  const where = { order: { listingId } };
  const [items, totalCount] = await Promise.all([
    prisma.review.findMany({
      where,
      include: REVIEW_LIST_INCLUDE,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.review.count({ where }),
  ]);
  return { items, totalCount };
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

const COMMENT_AUTHOR_SELECT = {
  author: {
    select: { id: true, fullName: true, profileImageUrl: true, role: true },
  },
};

export async function listCommentsForReview(reviewId) {
  return prisma.reviewComment.findMany({
    where: { reviewId },
    include: COMMENT_AUTHOR_SELECT,
    orderBy: { createdAt: "asc" },
  });
}

export async function createReviewComment({ reviewId, authorId, body }) {
  return prisma.reviewComment.create({
    data: { reviewId, authorId, body },
    include: COMMENT_AUTHOR_SELECT,
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
