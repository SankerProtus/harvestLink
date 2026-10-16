import { Router } from "express";

import {
  createListing,
  updateListing,
  updateListingQuantity,
  changeListingStatus,
  getListing,
  getFarmerListings,
  searchListings,
  listCrops,
  uploadListingPhoto,
} from "./marketplace.controller.js";

import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";
import { uploadSingleImage } from "../../common/middlewares/upload.middleware.js";

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

// Creating a listing uploads up to 5 photos (one request each) plus the create
// call itself. Keyed per user, not per IP: mobile carriers put many subscribers
// behind one shared IP, so an IP key lets strangers exhaust each other's quota.
const listingWriteLimiter = rateLimiter({
  routeName: "marketplace-listing-write",
  windowMs: 15 * 60 * 1000,
  max: 60,
  strategy: "user",
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
router.get("/crops", lightLimiter, listCrops);
router.get("/listings", lightLimiter, searchListings);

router.post("/listings", authMiddleware, listingWriteLimiter, createListing);
router.post(
  "/listings/photos",
  authMiddleware,
  listingWriteLimiter,
  uploadSingleImage,
  uploadListingPhoto,
);
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