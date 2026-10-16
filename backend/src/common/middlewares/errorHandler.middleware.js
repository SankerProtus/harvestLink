import { AppError } from "../../errors/AppError.js";
import { logger } from "../utils/logger.js";
import { normalizeKnownError } from "../utils/errorNormalizer.js";

export function errorHandlerMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const known = err instanceof AppError ? err : normalizeKnownError(err);

  if (known) {
    // Expected, user-facing failures are not logged as errors. Unexpected
    // AppErrors (isOperational === false) and library errors we had to
    // translate still leave a trail so they can be diagnosed.
    // NOTE: the logger redacts any key containing "code" (OTP safety), so the
    // identifiers below are deliberately named without that substring.
    if (!known.isOperational) {
      logger.error("Non-operational AppError", {
        errType: known.code,
        message: known.message,
        method: req.method,
        path: req.originalUrl,
        stack: known.stack,
      });
    } else if (known !== err) {
      logger.warn("Translated library error", {
        from: err?.name,
        libErrId: err?.code,
        errType: known.code,
        method: req.method,
        path: req.originalUrl,
      });
    }
    return res.status(known.statusCode).json(known.toJSON());
  }

  // Genuinely unexpected. Previously only name + message were logged, which
  // made production 500s (the generic "Something went wrong on our end")
  // impossible to diagnose. Include the stack and any library error code.
  logger.error("Unhandled error", {
    name: err?.name,
    message: err?.message,
    libErrId: err?.code,
    providerStatus: err?.http_code,
    method: req.method,
    path: req.originalUrl,
    userId: req.user?.id,
    stack: err?.stack,
  });

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
}