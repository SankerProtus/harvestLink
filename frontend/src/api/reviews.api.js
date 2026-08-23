import { apiClient } from "./client.js";

export function createReview({ orderId, rating, comment }) {
  return apiClient.post("/reviews", { orderId, rating, comment });
}

export function getReviewForOrder(orderId) {
  return apiClient.get(`/reviews/order/${orderId}`);
}

export function getFarmerReviews({ farmerId, page = 1, limit = 20 }) {
  return apiClient.get(`/reviews/farmer/${farmerId}`, {
    params: { page, limit },
  });
}

export function getListingReviews({ listingId, page = 1, limit = 20 }) {
  return apiClient.get(`/reviews/listing/${listingId}`, {
    params: { page, limit },
  });
}

export function getReviewComments(reviewId) {
  return apiClient.get(`/reviews/${reviewId}/comments`);
}

export function createReviewComment({ reviewId, body }) {
  return apiClient.post(`/reviews/${reviewId}/comments`, { body });
}
