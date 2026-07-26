import { Router } from "express";

import {
  createOrder,
  updateOrderStatus,
  reportLocation,
  getOrder,
  listMyOrdersAsBuyer,
  listMyOrdersAsFarmer,
} from "./deliveryTracking.controller.js";

import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";

const router = Router();

// Rate limiters for different routes, using either IP-based or user-based strategies.
const moderateLimiter = rateLimiter({
  routeName: "delivery-moderate",
  windowMs: 15 * 60 * 1000,
  max: 30,
  strategy: "ip",
});

const lightLimiter = rateLimiter({
  routeName: "delivery-light",
  windowMs: 15 * 60 * 1000,
  max: 100,
  strategy: "user",
});

// Public routes for listing orders as buyer or farmer, with authentication and light rate limiting.
router.get(
  "/orders/mine/buyer",
  authMiddleware,
  lightLimiter,
  listMyOrdersAsBuyer,
);
router.get(
  "/orders/mine/farmer",
  authMiddleware,
  lightLimiter,
  listMyOrdersAsFarmer,
);

router.post("/orders", authMiddleware, moderateLimiter, createOrder);
router.get("/orders/:orderId", authMiddleware, lightLimiter, getOrder);
router.patch(
  "/orders/:orderId/status",
  authMiddleware,
  moderateLimiter,
  updateOrderStatus,
);
router.post(
  "/orders/:orderId/location",
  authMiddleware,
  moderateLimiter,
  reportLocation,
);

export default router;
