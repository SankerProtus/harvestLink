import { apiClient } from "./client.js";

export function getOrderTrustContext(orderId) {
  return apiClient.get(`/trust/orders/${orderId}/context`);
}

export function uploadDisputeEvidence(imageUri) {
  const formData = new FormData();
  formData.append("photo", {
    uri: imageUri,
    name: `dispute-evidence-${Date.now()}.jpg`,
    type: "image/jpeg",
  });
  return apiClient.post("/trust/disputes/evidence", formData);
}

export function openDispute(orderId, payload) {
  return apiClient.post(`/trust/orders/${orderId}/disputes`, payload);
}

export function listMyDisputes() {
  return apiClient.get("/trust/disputes");
}

export function requestCancellation(orderId, reason) {
  return apiClient.post(`/trust/orders/${orderId}/cancellation-requests`, {
    reason,
  });
}

export function decideCancellation(orderId, requestId, decision) {
  return apiClient.post(
    `/trust/orders/${orderId}/cancellation-requests/${requestId}/decision`,
    { decision },
  );
}

export function generateHandoverCode(orderId) {
  return apiClient.post(`/trust/orders/${orderId}/handover-code`);
}

export function verifyHandoverCode(orderId, code) {
  return apiClient.post(`/trust/orders/${orderId}/handover-code/verify`, {
    code,
  });
}

export function submitVerificationRequest(payload) {
  return apiClient.post("/trust/verification-submissions", payload);
}
