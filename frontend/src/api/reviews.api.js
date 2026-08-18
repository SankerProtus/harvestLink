import { apiClient } from "./client.js";

export function createReview({ orderId, rating, comment }) {
  return apiClient.post("/reviews", { orderId, rating, comment });
}

export function getReviewForOrder(orderId) {
  return apiClient.get(`/reviews/order/${orderId}`);
}
