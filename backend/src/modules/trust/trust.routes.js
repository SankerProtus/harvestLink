import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";
import { uploadSingleImage } from "../../common/middlewares/upload.middleware.js";
import {
  getOrderTrustState,
  listDisputes,
  listReliabilityMetrics,
  postCancellationDecision,
  postCancellationRequest,
  postDispute,
  postDisputeEvidence,
  postGenerateHandoverCode,
  postVerificationSubmission,
  postVerifyHandoverCode,
} from "./trust.controller.js";

const router = Router();
const limiter = rateLimiter({
  routeName: "trust-moderate",
  windowMs: 15 * 60 * 1000,
  max: 30,
  strategy: "user",
});

router.use(authMiddleware);
router.post("/orders/:orderId/handover-code", limiter, postGenerateHandoverCode);
router.post("/orders/:orderId/handover-code/verify", limiter, postVerifyHandoverCode);
router.post("/orders/:orderId/cancellation-requests", limiter, postCancellationRequest);
router.post("/orders/:orderId/cancellation-requests/:requestId/decision", limiter, postCancellationDecision);
router.get("/orders/:orderId/context", getOrderTrustState);
router.post("/orders/:orderId/disputes", limiter, postDispute);
router.post(
  "/disputes/evidence",
  limiter,
  uploadSingleImage,
  postDisputeEvidence,
);
router.get("/disputes", listDisputes);
router.post("/verification-submissions", limiter, postVerificationSubmission);
router.get("/reliability-metrics", listReliabilityMetrics);

export default router;
