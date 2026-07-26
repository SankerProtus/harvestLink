import express from "express";
import helmet from "helmet";
import authRoutes from "./src/modules/auth/auth.routes.js";
import marketplaceRoutes from "./src/modules/marketplace/marketplace.routes.js";
import buyerMatchingRoutes from "./src/modules/buyerMatching/buyerMatching.routes.js";
import deliveryTrackingRoutes from "./src/modules/deliveryTracking/deliveryTracking.routes.js";
import { errorHandlerMiddleware } from "./src/common/middlewares/errorHandler.middleware.js";
import { logger } from "./src/common/utils/logger.js";
import { uptime } from "node:process";

const app = express();

app.use(helmet());
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
