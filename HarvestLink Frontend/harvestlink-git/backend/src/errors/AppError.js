export class AppError extends Error {
  constructor(
    message,
    { statusCode, code, isOperational = true, details = null, cause } = {},
  ) {
    super(message);

    if (!statusCode || !code) {
      throw new Error("AppError requires both statusCode and code");
    }

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;
    this.timestamp = new Date().toISOString();

    if (cause) {
      this.cause = cause;
    }

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Safe shape for API responses. Never leaks stack traces or internals.
   */
  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.details ? { details: this.details } : {}),
      },
    };
  }
}
