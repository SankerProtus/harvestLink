import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as notificationsApi from "../../../api/notifications.api.js";

export const notificationQueryKeys = {
  root: ["notifications"],
  list: (params) => ["notifications", "list", params],
  unreadCount: ["notifications", "unreadCount"],
};

export function useNotifications(params = { page: 1, limit: 20 }) {
  return useQuery({
    queryKey: notificationQueryKeys.list(params),
    queryFn: () => notificationsApi.getMyNotifications(params),
  });
}

// Polls periodically so the badge count reflects new notifications
// (order placed, interest expressed, review received, etc.) without
// needing a push/socket layer.
export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: notificationQueryKeys.unreadCount,
    queryFn: () => notificationsApi.getUnreadNotificationCount(),
    select: (data) => data.unreadCount ?? 0,
    refetchInterval: 30000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId) =>
      notificationsApi.markNotificationRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.root });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.root });
    },
  });
}
