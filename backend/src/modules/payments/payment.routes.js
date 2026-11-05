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

router.post("/webhook", webhookLimiter, postPaymentWebhook);
router.post(
  "/initialize",
  authMiddleware,
  requireRole(USER_ROLES.BUYER),
  initializePaymentCheckout,
);

export default router;
