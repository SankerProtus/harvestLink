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

// Called directly from other modules' services at the same points their
// (currently unpublished) domain events are built — see the
// `// TODO: publish event` comments in deliveryTracking.service.js,
// listingInterest.service.js, reviews.service.js. This is a plain
// function call rather than a real event bus, matching how cross-module
// calls already work elsewhere in this codebase (e.g. deliveryTracking
// calling marketplace.service.js directly).
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
