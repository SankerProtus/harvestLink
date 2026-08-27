import {
  findOrderById,
  findReviewByOrderId,
  findReviewById,
  findFarmerById,
  findListingById,
  createReview as createReviewRepo,
  getRatingSummaryForFarmers as getRatingSummaryForFarmersRepo,
  listReviewsForFarmer as listReviewsForFarmerRepo,
  listReviewsForListing as listReviewsForListingRepo,
  listCommentsForReview as listCommentsForReviewRepo,
  createReviewComment as createReviewCommentRepo,
} from "./reviews.repository.js";
import {
  toReviewDTO,
  toReviewListResponse,
  toReviewCommentDTO,
} from "./reviews.mapper.js";
import {
  OrderNotFoundError,
  NotOrderParticipantError,
  NotOrderBuyerError,
  OrderNotDeliveredError,
  OrderAlreadyReviewedError,
  ReviewNotFoundError,
  FarmerNotFoundError,
  ListingNotFoundError,
  NotReviewParticipantError,
} from "./reviews.errors.js";
import { createNotification } from "../notifications/notifications.service.js";
import { NOTIFICATION_TYPE } from "../notifications/notifications.constants.js";
import { emitNewReviewComment } from "../../common/realtime/socketServer.js";

async function requireOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new OrderNotFoundError();
  }
  return order;
}

export async function createReview({ orderId, buyerId, rating, comment }) {
  const order = await requireOrder(orderId);

  if (order.buyerId !== buyerId) {
    throw new NotOrderBuyerError();
  }
  if (order.status !== "DELIVERED") {
    throw new OrderNotDeliveredError();
  }

  const existing = await findReviewByOrderId(orderId);
  if (existing) {
    throw new OrderAlreadyReviewedError();
  }

  const review = await createReviewRepo({
    orderId,
    farmerId: order.farmerId,
    buyerId,
    rating,
    comment,
  });

  await createNotification({
    userId: order.farmerId,
    type: NOTIFICATION_TYPE.NEW_REVIEW,
    title: "New review received",
    body: `You received a ${rating}-star rating on a delivered order.`,
    orderId,
    listingId: order.listingId,
  });

  return toReviewDTO(review);
}

export async function getReviewForOrder({ orderId, userId }) {
  const order = await requireOrder(orderId);

  if (order.buyerId !== userId && order.farmerId !== userId) {
    throw new NotOrderParticipantError();
  }

  const review = await findReviewByOrderId(orderId);
  return review ? toReviewDTO(review) : null;
}

// Used by other modules (marketplace, buyerMatching) to enrich farmer
// info in listing DTOs with a real, computed rating — never a fabricated
// number. Returns a Map keyed by farmerId; farmers with no reviews yet
// simply won't have an entry, and callers should render nothing rather
// than a placeholder in that case.
export async function getRatingSummaryForFarmers(farmerIds) {
  return getRatingSummaryForFarmersRepo(farmerIds);
}

export async function listReviewsForFarmer({ farmerId, page, limit }) {
  const farmer = await findFarmerById(farmerId);
  if (!farmer) {
    throw new FarmerNotFoundError();
  }

  const skip = (page - 1) * limit;
  const [{ items, totalCount }, ratingSummaryByFarmerId] = await Promise.all([
    listReviewsForFarmerRepo(farmerId, { skip, take: limit }),
    getRatingSummaryForFarmersRepo([farmerId]),
  ]);
  const ratingSummary = ratingSummaryByFarmerId.get(farmerId);

  return {
    farmer: {
      id: farmer.id,
      name: farmer.fullName,
      avatarUrl: farmer.profileImageUrl ?? null,
      rating: ratingSummary?.rating != null ? Number(ratingSummary.rating) : null,
      reviewCount: ratingSummary?.reviewCount ?? 0,
    },
    ...toReviewListResponse({ reviews: items, page, limit, total: totalCount }),
  };
}

export async function listReviewsForListing({ listingId, page, limit }) {
  const listing = await findListingById(listingId);
  if (!listing) {
    throw new ListingNotFoundError();
  }

  const skip = (page - 1) * limit;
  const { items, totalCount } = await listReviewsForListingRepo(listingId, {
    skip,
    take: limit,
  });

  return toReviewListResponse({
    reviews: items,
    page,
    limit,
    total: totalCount,
  });
}

async function requireReview(reviewId) {
  const review = await findReviewById(reviewId);
  if (!review) {
    throw new ReviewNotFoundError();
  }
  return review;
}

// Comments are readable by anyone who can see the review itself — like a
// public seller response on a marketplace review. Only posting is
// restricted (see addReviewComment below).
export async function listReviewComments(reviewId) {
  const review = await requireReview(reviewId);
  const comments = await listCommentsForReviewRepo(reviewId);
  return comments.map((comment) => toReviewCommentDTO(comment, review));
}

export async function addReviewComment({ reviewId, authorId, body }) {
  const review = await requireReview(reviewId);

  const isBuyer = authorId === review.buyerId;
  const isFarmer = authorId === review.farmerId;
  if (!isBuyer && !isFarmer) {
    throw new NotReviewParticipantError();
  }

  const comment = await createReviewCommentRepo({ reviewId, authorId, body });
  const commentDTO = toReviewCommentDTO(comment, review);

  // Push to anyone else currently viewing this review's thread — the
  // author already has their own copy from this function's return value.
  emitNewReviewComment(reviewId, commentDTO);

  const recipientId = isBuyer ? review.farmerId : review.buyerId;
  await createNotification({
    userId: recipientId,
    type: NOTIFICATION_TYPE.REVIEW_COMMENT,
    title: isBuyer ? "New reply from a buyer" : "The farmer replied",
    body:
      body.length > 80 ? `${body.slice(0, 77)}…` : body,
    orderId: review.orderId,
    listingId: null,
  });

  return commentDTO;
}
