function serializeDate(date) {
  if (!date) return null;
  return date instanceof Date
    ? date.toISOString()
    : new Date(date).toISOString();
}

export function toNotificationDTO(notification) {
  return {
    id: notification.id,
    type: notification.type,
    title: notification.title,
    body: notification.body,
    orderId: notification.orderId ?? null,
    listingId: notification.listingId ?? null,
    isRead: notification.isRead,
    createdAt: serializeDate(notification.createdAt),
  };
}

export function toNotificationListResponse({
  notifications,
  page,
  limit,
  total,
}) {
  return {
    results: notifications.map(toNotificationDTO),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
