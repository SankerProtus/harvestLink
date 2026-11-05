import { Router } from "express";

import {
  expressInterest,
  withdrawInterest,
  getInterestForListing,
  getInterestSummaryForFarmer,
  getInterestedListingIdsForBuyer,
} from "./listingInterest.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { requireRole } from "../../common/middlewares/role.middleware.js";
import { USER_ROLES } from "../auth/auth.constants.js";
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

router.post(
  "/",
  authMiddleware,
  requireRole(USER_ROLES.BUYER),
  moderateUserLimiter,
  expressInterest,
);
router.delete(
  "/listings/:listingId",
  authMiddleware,
  requireRole(USER_ROLES.BUYER),
  moderateUserLimiter,
  withdrawInterest,
);
router.get(
  "/listings/:listingId",
  authMiddleware,
  requireRole(USER_ROLES.FARMER),
  lightUserLimiter,
  getInterestForListing,
);
router.get(
  "/summary/mine",
  authMiddleware,
  requireRole(USER_ROLES.FARMER),
  lightUserLimiter,
  getInterestSummaryForFarmer,
);
router.get(
  "/mine",
  authMiddleware,
  requireRole(USER_ROLES.BUYER),
  lightUserLimiter,
  getInterestedListingIdsForBuyer,
);

export default router;
