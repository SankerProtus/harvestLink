import { Router } from "express";

import {
  createListing,
  updateListing,
  updateListingQuantity,
  changeListingStatus,
  getListing,
  getFarmerListings,
  searchListings,
} from "./marketplace.controller.js";

import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";

const router = Router();

// Rate limiters for different routes, using either IP-based or user-based strategies.
const moderateLimiter = rateLimiter({
  routeName: "marketplace-moderate",
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  strategy: "ip",
});

const lightLimiter = rateLimiter({
  routeName: "marketplace-light",
  windowMs: 15 * 60 * 1000,
  max: 100,
  strategy: "ip",
});

const lightUserLimiter = rateLimiter({
  routeName: "marketplace-light-user",
  windowMs: 15 * 60 * 1000,
  max: 100,
  strategy: "user",
});

// Public routes for listing and searching listings, with authentication and light rate limiting.
router.get(
  "/listings/mine",
  authMiddleware,
  lightUserLimiter,
  getFarmerListings,
);
router.get("/listings", lightLimiter, searchListings);

router.post("/listings", authMiddleware, moderateLimiter, createListing);
router.patch(
  "/listings/:listingId",
  authMiddleware,
  moderateLimiter,
  updateListing,
);
router.patch(
  "/listings/:listingId/quantity",
  authMiddleware,
  moderateLimiter,
  updateListingQuantity,
);
router.patch(
  "/listings/:listingId/status",
  authMiddleware,
  moderateLimiter,
  changeListingStatus,
);
router.get("/listings/:listingId", lightLimiter, getListing);

export default router;
