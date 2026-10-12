import { Router } from "express";

import {
  saveListing,
  unsaveListing,
  getMySavedListingIds,
  getMySavedListings
} from "./savedListings.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
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

router.get("/", authMiddleware, lightUserLimiter, getMySavedListings);

router.post(
  "/listings/:listingId",
  authMiddleware,
  moderateUserLimiter,
  saveListing,
);
router.delete(
  "/listings/:listingId",
  authMiddleware,
  moderateUserLimiter,
  unsaveListing,
);
router.get("/mine", authMiddleware, lightUserLimiter, getMySavedListingIds);

export default router;
