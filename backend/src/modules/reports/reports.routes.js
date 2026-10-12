import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { adminMiddleware } from "../../common/middlewares/admin.middleware.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";
import { postUserReport, getUserReports, postReviewUserReport } from "./reports.controller.js";

const router = Router();
const limiter = rateLimiter({ routeName: "user-reports", windowMs: 15 * 60 * 1000, max: 20, strategy: "user" });

router.post("/users/:userId", authMiddleware, limiter, postUserReport);
router.get("/admin", authMiddleware, adminMiddleware, limiter, getUserReports);
router.post("/admin/:reportId/review", authMiddleware, adminMiddleware, limiter, postReviewUserReport);

export default router;
