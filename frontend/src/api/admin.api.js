import { apiClient } from "./client.js";

export function getOverview() {
  return apiClient.get("/admin/overview");
}

export function getUsers() { return apiClient.get("/admin/users"); }
export function getListings() { return apiClient.get("/admin/listings"); }
export function getOrders() { return apiClient.get("/admin/orders"); }
export function getPayments() { return apiClient.get("/admin/payments"); }
export function getAuditLogs() { return apiClient.get("/admin/audit-logs"); }
export function setUserStatus(userId, payload) {
  return apiClient.post(`/admin/users/${userId}/status`, payload);
}

export function getVerificationQueue() {
  return apiClient.get("/admin/verification-queue");
}

export function decideVerification(recordId, payload) {
  return apiClient.post(
    `/admin/verification-queue/${recordId}/decision`,
    payload,
  );
}

export function getPriceReviewQueue() {
  return apiClient.get("/admin/price-review-queue");
}

export function clearPriceReview(listingId) {
  return apiClient.post(`/admin/price-review-queue/${listingId}/clear`);
}

export function getDisputeQueue() {
  return apiClient.get("/admin/dispute-queue");
}

export function getDisputeDetail(disputeId) {
  return apiClient.get(`/admin/dispute-queue/${disputeId}`);
}

export function startDisputeReview(disputeId) {
  return apiClient.post(`/admin/dispute-queue/${disputeId}/start-review`);
}

export function resolveDispute(disputeId, { outcome, resolution }) {
  return apiClient.post(`/admin/dispute-queue/${disputeId}/resolve`, {
    outcome,
    resolution,
  });
}
