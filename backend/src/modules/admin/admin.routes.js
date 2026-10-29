import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { adminMiddleware } from "../../common/middlewares/admin.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";
import {
  getVerificationQueue,
  postVerificationDecision,
  getPriceReviewQueue,
  postClearPriceReview,
  getDisputeQueue,
  getDisputeDetail,
  postStartDisputeReview,
  postResolveDispute,
  getOverview,
  getUsers,
  postUserStatus,
  getListings,
  getOrders,
  getPayments,
  getAuditLogs,
  getOrderDetail,
  getPaymentDetail,
  getListingDetail,
  getAuditEventDetail,
} from "./admin.controller.js";

const router = Router();

const adminLimiter = rateLimiter({
  routeName: "admin-moderate",
  windowMs: 15 * 60 * 1000,
  max: 60,
  strategy: "user",
});

router.use(authMiddleware, adminMiddleware, adminLimiter);

router.get("/overview", getOverview);
router.get("/users", getUsers);
router.post("/users/:userId/status", postUserStatus);
router.get("/listings", getListings);
router.get("/listings/:listingId", getListingDetail);
router.get("/orders", getOrders);
router.get("/orders/:orderId", getOrderDetail);
router.get("/payments", getPayments);
router.get("/payments/:paymentId", getPaymentDetail);
router.get("/audit-logs", getAuditLogs);
router.get("/audit-logs/:eventId", getAuditEventDetail);
router.get("/verification-queue", getVerificationQueue);
router.post("/verification-queue/:recordId/decision", postVerificationDecision);
router.get("/price-review-queue", getPriceReviewQueue);
router.post("/price-review-queue/:listingId/clear", postClearPriceReview);
router.get("/dispute-queue", getDisputeQueue);
router.get("/dispute-queue/:disputeId", getDisputeDetail);
router.post("/dispute-queue/:disputeId/start-review", postStartDisputeReview);
router.post("/dispute-queue/:disputeId/resolve", postResolveDispute);

export default router;
