import {
  createNotification as createNotificationRepo,
  listNotificationsForUser,
  countUnreadForUser,
  findNotificationById,
  markNotificationRead,
  markAllNotificationsReadForUser,
} from "./notifications.repository.js";
import { toNotificationListResponse } from "./notifications.mapper.js";
import {
  NotificationNotFoundError,
  NotNotificationOwnerError,
} from "./notifications.errors.js";

export async function createNotification(input) {
  return createNotificationRepo(input);
}

export async function listMyNotifications({ userId, page, limit }) {
  const skip = (page - 1) * limit;
  const { items, totalCount } = await listNotificationsForUser(userId, {
    skip,
    take: limit,
  });
  return toNotificationListResponse({
    notifications: items,
    page,
    limit,
    total: totalCount,
  });
}

export async function getUnreadCount(userId) {
  const count = await countUnreadForUser(userId);
  return { unreadCount: count };
}

export async function markAsRead({ notificationId, userId }) {
  const notification = await findNotificationById(notificationId);
  if (!notification) {
    throw new NotificationNotFoundError();
  }
  if (notification.userId !== userId) {
    throw new NotNotificationOwnerError();
  }
  await markNotificationRead(notificationId);
}

export async function markAllAsRead(userId) {
  await markAllNotificationsReadForUser(userId);
}
