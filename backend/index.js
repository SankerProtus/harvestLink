import express from "express";
import helmet from "helmet";
import cors from "cors";
import { resolveCorsOriginConfig } from "./src/common/config/cors.js";
import authRoutes from "./src/modules/auth/auth.routes.js";
import marketplaceRoutes from "./src/modules/marketplace/marketplace.routes.js";
import buyerMatchingRoutes from "./src/modules/buyerMatching/buyerMatching.routes.js";
import deliveryTrackingRoutes from "./src/modules/deliveryTracking/deliveryTracking.routes.js";
import listingInterestRoutes from "./src/modules/listingInterest/listingInterest.routes.js";
import reviewsRoutes from "./src/modules/reviews/reviews.routes.js";
import savedListingsRoutes from "./src/modules/savedListings/savedListings.routes.js";
import notificationsRoutes from "./src/modules/notifications/notifications.routes.js";
import adminRoutes from "./src/modules/admin/admin.routes.js";
import trustRoutes from "./src/modules/trust/trust.routes.js";
import reportsRoutes from "./src/modules/reports/reports.routes.js";
import paymentRoutes from "./src/modules/payments/payment.routes.js";
import verificationRoutes from "./src/modules/trust/verification.routes.js";
import { errorHandlerMiddleware } from "./src/common/middlewares/errorHandler.middleware.js";
import { logger } from "./src/common/utils/logger.js";
import { uptime } from "node:process";

const app = express();

const trustProxy = process.env.TRUST_PROXY?.trim();
if (trustProxy) {
  const hops = trustProxy === "true" ? 1 : Number(trustProxy);
  app.set("trust proxy", Number.isFinite(hops) ? hops : trustProxy);
} else if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(helmet());
app.use(
  cors({
    origin: resolveCorsOriginConfig(),
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    logger.info("HTTP request", {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
    });
  });

  next();
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/buyer-matching", buyerMatchingRoutes);
app.use("/api/delivery-tracking", deliveryTrackingRoutes);
app.use("/api/listing-interest", listingInterestRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/saved-listings", savedListingsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/trust", trustRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/verification", verificationRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
    },
  });
});

app.use(errorHandlerMiddleware);

export default app;