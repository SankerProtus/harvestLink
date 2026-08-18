import { AppError } from "../../errors/AppError.js";
import { logger } from "../utils/logger.js";

export function errorHandlerMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    if (!err.isOperational) {
      logger.error("Non-operational AppError", {
        code: err.code,
        message: err.message,
      });
    }
    return res.status(err.statusCode).json(err.toJSON());
  }

  logger.error("Unhandled error", { message: err.message, name: err.name });

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
}
