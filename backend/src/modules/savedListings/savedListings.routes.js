import { Router } from "express";

import {
  saveListing,
  unsaveListing,
  getMySavedListingIds,
  getMySavedListings
} from "./savedListings.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { requireRole } from "../../common/middlewares/role.middleware.js";
import { USER_ROLES } from "../auth/auth.constants.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";

const router = Router();

const moderateUserLimiter = rateLimiter({
  routeName: "saved-listings-moderate-user",
  windowMs: 15 * 60 * 1000,
  max: 60,
  strategy: "user",
});

const lightUserLimiter = rateLimiter({
  routeName: "saved-listings-light-user",
  windowMs: 15 * 60 * 1000,
  max: 100,
  strategy: "user",
});

router.get(
  "/",
  authMiddleware,
  requireRole(USER_ROLES.BUYER),
  lightUserLimiter,
  getMySavedListings,
);

router.post(
  "/listings/:listingId",
  authMiddleware,
  requireRole(USER_ROLES.BUYER),
  moderateUserLimiter,
  saveListing,
);
router.delete(
  "/listings/:listingId",
  authMiddleware,
  requireRole(USER_ROLES.BUYER),
  moderateUserLimiter,
  unsaveListing,
);
router.get(
  "/mine",
  authMiddleware,
  requireRole(USER_ROLES.BUYER),
  lightUserLimiter,
  getMySavedListingIds,
);

export default router;
