import { AppError } from "../../errors/AppError.js";

export class TrustValidationError extends AppError {
  constructor(message, details = null) {
    super(message, { statusCode: 422, code: "TRUST_VALIDATION_ERROR", isOperational: true, details });
  }
}

export class TrustNotFoundError extends AppError {
  constructor(message = "Trust record not found") {
    super(message, { statusCode: 404, code: "TRUST_NOT_FOUND", isOperational: true });
  }
}

export class TrustConflictError extends AppError {
  constructor(message, details = null) {
    super(message, { statusCode: 409, code: "TRUST_CONFLICT", isOperational: true, details });
  }
}

export class TrustForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, { statusCode: 403, code: "TRUST_FORBIDDEN", isOperational: true });
  }
}
