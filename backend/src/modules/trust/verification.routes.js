import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";
import { postVerificationSubmission } from "./trust.controller.js";

const router = Router();
const limiter = rateLimiter({
  routeName: "verification-submit",
  windowMs: 15 * 60 * 1000,
  max: 5,
  strategy: "user",
});

router.post("/submit", authMiddleware, limiter, postVerificationSubmission);

export default router;
