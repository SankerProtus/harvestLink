import { Router } from "express";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";
import { postPaymentWebhook } from "./payment.controller.js";
import { initializePaymentCheckout } from "./payment.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { requireRole } from "../../common/middlewares/role.middleware.js";
import { USER_ROLES } from "../auth/auth.constants.js";

const router = Router();
const webhookLimiter = rateLimiter({
  routeName: "payment-webhook",
  windowMs: 60 * 1000,
  max: 120,
  strategy: "ip",
});
const initializeLimiter = rateLimiter({
  routeName: "payment-initialize",
  windowMs: 15 * 60 * 1000,
  max: 10,
  strategy: "user",
});

router.post("/webhook", webhookLimiter, postPaymentWebhook);
router.post(
  "/initialize",
  authMiddleware,
  requireRole(USER_ROLES.BUYER),
  initializeLimiter,
  initializePaymentCheckout,
);

export default router;
