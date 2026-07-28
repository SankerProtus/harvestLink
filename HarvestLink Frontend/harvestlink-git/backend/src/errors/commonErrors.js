import { AppError } from "./AppError.js";

export class BadRequestError extends AppError {
  constructor(message = "Bad request", details = null) {
    super(message, {
      statusCode: 400,
      code: "BAD_REQUEST",
      isOperational: true,
      details,
    });
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", details = null) {
    super(message, {
      statusCode: 422,
      code: "VALIDATION_ERROR",
      isOperational: true,
      details,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required", details = null) {
    super(message, {
      statusCode: 401,
      code: "UNAUTHORIZED",
      isOperational: true,
      details,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(
    message = "You do not have permission to perform this action",
    details = null,
  ) {
    super(message, {
      statusCode: 403,
      code: "FORBIDDEN",
      isOperational: true,
      details,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", details = null) {
    super(message, {
      statusCode: 404,
      code: "NOT_FOUND",
      isOperational: true,
      details,
    });
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource conflict", details = null) {
    super(message, {
      statusCode: 409,
      code: "CONFLICT",
      isOperational: true,
      details,
    });
  }
}

export class RateLimitError extends AppError {
  constructor(
    message = "Too many requests, please try again later",
    details = null,
  ) {
    super(message, {
      statusCode: 429,
      code: "RATE_LIMIT_EXCEEDED",
      isOperational: true,
      details,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(message = "An unexpected error occurred", details = null) {
    super(message, {
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      isOperational: false, // unexpected/bug, not a normal operational error
      details,
    });
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = "Service temporarily unavailable", details = null) {
    super(message, {
      statusCode: 503,
      code: "SERVICE_UNAVAILABLE",
      isOperational: true,
      details,
    });
  }
}
