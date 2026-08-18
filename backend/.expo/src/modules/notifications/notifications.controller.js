import {
  parseOrThrow,
  listNotificationsQuerySchema,
  notificationIdParamSchema,
} from "./notifications.validators.js";
import {
  listMyNotifications,
  getUnreadCount,
  markAsRead as markAsReadService,
  markAllAsRead as markAllAsReadService,
} from "./notifications.service.js";

function sendSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ success: true, data });
}

export async function listMine(req, res, next) {
  try {
    const { page, limit } = parseOrThrow(
      listNotificationsQuerySchema,
      req.query,
    );
    const result = await listMyNotifications({
      userId: req.user.id,
      page,
      limit,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function unreadCount(req, res, next) {
  try {
    const result = await getUnreadCount(req.user.id);
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function markRead(req, res, next) {
  try {
    const { notificationId } = parseOrThrow(
      notificationIdParamSchema,
      req.params,
    );
    await markAsReadService({ notificationId, userId: req.user.id });
    return sendSuccess(res, 200, { notificationId });
  } catch (err) {
    next(err);
  }
}

export async function markAllRead(req, res, next) {
  try {
    await markAllAsReadService(req.user.id);
    return sendSuccess(res, 200, {});
  } catch (err) {
    next(err);
  }
}
