import "dotenv/config";

import { createServer } from "node:http";

import { validateEnvironment } from "./src/common/config/env.validation.js";
import { logger } from "./src/common/utils/logger.js";
import { prisma } from "./src/common/utils/prismaClient.js";
import { initSocketServer } from "./src/common/realtime/socketServer.js";
import app from "./index.js";

const PORT = process.env.PORT || 3000;

let httpServer;

function start() {
  httpServer = createServer(app);
  initSocketServer(httpServer);

  httpServer.listen(PORT, () => {
    logger.info("Server started", {
      port: PORT,
      env: process.env.NODE_ENV ?? "development",
    });
  });
}

// Graceful shutdown
async function shutdown(signal) {
  logger.info("Shutdown signal received", { signal });

  try {
    if (httpServer) {
      await new Promise((resolve, reject) => {
        httpServer.close((err) => (err ? reject(err) : resolve()));
      });
      logger.info("HTTP server closed");
    }

    await prisma.$disconnect();
    logger.info("Prisma connection closed");

    process.exit(0);
  } catch (err) {
    logger.error("Error during shutdown", { message: err.message });
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

try {
  validateEnvironment();
  start();
} catch (err) {
  logger.error("Fatal startup error", { message: err.message });
  process.exit(1);
}