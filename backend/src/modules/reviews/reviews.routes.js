import { Router } from "express";

import {
  createReview,
  getReviewForOrder,
  listFarmerReviews,
  listListingReviews,
  listReviewComments,
  createReviewComment,
} from "./reviews.controller.js";
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
router.get(
  "/farmer/:farmerId",
  authMiddleware,
  lightUserLimiter,
  listFarmerReviews,
);
router.get(
  "/listing/:listingId",
  authMiddleware,
  lightUserLimiter,
  listListingReviews,
);
router.get(
  "/:reviewId/comments",
  authMiddleware,
  lightUserLimiter,
  listReviewComments,
);
router.post(
  "/:reviewId/comments",
  authMiddleware,
  moderateUserLimiter,
  createReviewComment,
);

export default router;
