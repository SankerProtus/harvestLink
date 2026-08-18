import { Router } from "express";

import {
  listMine,
  unreadCount,
  markRead,
  markAllRead,
} from "./notifications.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";

const router = Router();

const lightUserLimiter = rateLimiter({
  routeName: "notifications-light-user",
  windowMs: 15 * 60 * 1000,
  max: 200,
  strategy: "user",
});

const moderateUserLimiter = rateLimiter({
  routeName: "notifications-moderate-user",
  windowMs: 15 * 60 * 1000,
  max: 60,
  strategy: "user",
});

router.get("/", authMiddleware, lightUserLimiter, listMine);
router.get("/unread-count", authMiddleware, lightUserLimiter, unreadCount);
router.patch(
  "/:notificationId/read",
  authMiddleware,
  moderateUserLimiter,
  markRead,
);
router.patch("/read-all", authMiddleware, moderateUserLimiter, markAllRead);

export default router;
