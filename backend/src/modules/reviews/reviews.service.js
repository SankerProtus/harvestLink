import {
  findOrderById,
  findReviewByOrderId,
  createReview as createReviewRepo,
  getRatingSummaryForFarmers as getRatingSummaryForFarmersRepo,
} from "./reviews.repository.js";
import { toReviewDTO } from "./reviews.mapper.js";
import {
  OrderNotFoundError,
  NotOrderParticipantError,
  NotOrderBuyerError,
  OrderNotDeliveredError,
  OrderAlreadyReviewedError,
} from "./reviews.errors.js";
import { createNotification } from "../notifications/notifications.service.js";
import { NOTIFICATION_TYPE } from "../notifications/notifications.constants.js";

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
