import { Router } from "express";

import {
  expressInterest,
  withdrawInterest,
  getInterestForListing,
  getInterestSummaryForFarmer,
  getInterestedListingIdsForBuyer,
} from "./listingInterest.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";

const router = Router();

const moderateUserLimiter = rateLimiter({
  routeName: "listing-interest-moderate-user",
  windowMs: 15 * 60 * 1000,
  max: 30,
  strategy: "user",
});

const lightUserLimiter = rateLimiter({
  routeName: "listing-interest-light-user",
  windowMs: 15 * 60 * 1000,
  max: 100,
  strategy: "user",
});

router.post("/", authMiddleware, moderateUserLimiter, expressInterest);
router.delete(
  "/listings/:listingId",
  authMiddleware,
  moderateUserLimiter,
  withdrawInterest,
);
router.get(
  "/listings/:listingId",
  authMiddleware,
  lightUserLimiter,
  getInterestForListing,
);
router.get(
  "/summary/mine",
  authMiddleware,
  lightUserLimiter,
  getInterestSummaryForFarmer,
);
router.get(
  "/mine",
  authMiddleware,
  lightUserLimiter,
  getInterestedListingIdsForBuyer,
);

export default router;
