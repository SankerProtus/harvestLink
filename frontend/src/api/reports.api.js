import { apiClient } from "./client.js";

export function reportUser(userId, payload) {
  return apiClient.post(`/reports/users/${userId}`, payload);
}

export function getAdminReports() {
  return apiClient.get("/reports/admin");
}

export function reviewAdminReport(reportId, payload) {
  return apiClient.post(`/reports/admin/${reportId}/review`, payload);
}
