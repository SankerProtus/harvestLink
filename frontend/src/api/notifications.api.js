import { apiClient } from "./client.js";

export function getMyNotifications(params) {
  return apiClient.get("/notifications", { params });
}

export function getUnreadNotificationCount() {
  return apiClient.get("/notifications/unread-count");
}

export function markNotificationRead(notificationId) {
  return apiClient.patch(`/notifications/${notificationId}/read`);
}

export function markAllNotificationsRead() {
  return apiClient.patch("/notifications/read-all");
}
