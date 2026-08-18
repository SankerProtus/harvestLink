import { Router } from "express";

import { createReview, getReviewForOrder } from "./reviews.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";

const router = Router();

const moderateUserLimiter = rateLimiter({
  routeName: "reviews-moderate-user",
  windowMs: 15 * 60 * 1000,
  max: 30,
  strategy: "user",
});

const lightUserLimiter = rateLimiter({
  routeName: "reviews-light-user",
  windowMs: 15 * 60 * 1000,
  max: 100,
  strategy: "user",
});

router.post("/", authMiddleware, moderateUserLimiter, createReview);
router.get(
  "/order/:orderId",
  authMiddleware,
  lightUserLimiter,
  getReviewForOrder,
);

export default router;
