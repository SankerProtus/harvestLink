import pino from "pino";
import { isMarketplaceError } from "../../modules/marketplace/marketplace.errors.js";
import { isDeliveryError } from "../../modules/delivery/delivery.errors.js";

const logger = pino({ level: process.env.LOG_LEVEL ?? "info" }).child({
  module: "ErrorHandler",
});

function isDomainError(err) {
  return isMarketplaceError(err) || isDeliveryError(err);
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (isDomainError(err)) {
    if (err.statusCode >= 500) logger.error({ err }, "domain error");
    else logger.warn({ err: err.message, code: err.code }, "domain error");

    return res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message, details: err.details },
    });
  }

  logger.error({ err }, "unhandled error");
  return res.status(500).json({
    success: false,
    error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
  });
}
