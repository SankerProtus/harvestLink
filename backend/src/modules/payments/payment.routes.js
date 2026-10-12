import { Router } from "express";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";
import { postPaymentWebhook } from "./payment.controller.js";

const router = Router();
const webhookLimiter = rateLimiter({
  routeName: "payment-webhook",
  windowMs: 60 * 1000,
  max: 120,
  strategy: "ip",
});

router.post("/webhook", webhookLimiter, postPaymentWebhook);

export default router;
