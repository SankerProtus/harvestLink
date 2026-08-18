import { Router } from "express";

import {
  requestOtp,
  verifyOtp,
  resendOtp,
  register,
  login,
  refresh,
  logout,
  listSessions,
  revokeSession,
  googleSignIn,
  linkGoogleAccount,
  changePhoneNumber,
  getProfile,
  uploadProfilePhoto,
} from "./auth.controller.js";

import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";

import { uploadSingleImage } from "../../common/middlewares/upload.middleware.js";

const router = Router();

// Rate limiters for different routes, using either IP-based or user-based strategies.
const strictOtpLimiter = rateLimiter({
  routeName: "otp",
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  strategy: "ip",
});

const strictLoginLimiter = rateLimiter({
  routeName: "login",
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  strategy: "ip",
});

const strictChangePhoneLimiter = rateLimiter({
  routeName: "change-phone",
  windowMs: 60 * 60 * 1000,
  max: 5,
  strategy: "user",
});

const moderateLimiter = rateLimiter({
  routeName: "moderate",
  windowMs: 15 * 60 * 1000,
  max: 30,
  strategy: "ip",
});

// Public OTP routes

router.post("/otp/request", strictOtpLimiter, requestOtp);
router.post("/otp/verify", strictOtpLimiter, verifyOtp);
router.post("/otp/resend", strictOtpLimiter, resendOtp);

// Registration / Login

router.post("/register", moderateLimiter, register);
router.post("/login", strictLoginLimiter, login);

// Session / Token Management

router.post("/refresh", moderateLimiter, refresh);
router.post("/logout", authMiddleware, logout);
router.get("/sessions", authMiddleware, listSessions);
router.delete("/sessions/:sessionId", authMiddleware, revokeSession);

// Google OAuth

router.post("/google/signin", moderateLimiter, googleSignIn);
router.post("/google/link", authMiddleware, linkGoogleAccount);

// Profile / Phone Management

router.patch(
  "/phone",
  authMiddleware,
  strictChangePhoneLimiter,
  changePhoneNumber,
);
router.get("/profile", authMiddleware, getProfile);

router.patch(
  "/profile/photo",
  authMiddleware,
  moderateLimiter,
  uploadSingleImage,
  uploadProfilePhoto,
);

export default router;
