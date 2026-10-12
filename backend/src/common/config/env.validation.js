import { logger } from "../utils/logger.js";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

/**
 * Fail fast on unsafe production configuration before accepting traffic.
 */
export function validateEnvironment() {
  const errors = [];

  if (isProduction()) {
    if (process.env.OTP_DEBUG_EXPOSE === "true") {
      errors.push("OTP_DEBUG_EXPOSE must not be enabled in production");
    }

    const smsProvider = process.env.SMS_PROVIDER ?? "mock";
    if (smsProvider === "mock") {
      errors.push(
        'SMS_PROVIDER must not be "mock" in production (configure a real provider such as "arkesel")',
      );
    }

    if (!process.env.CORS_ORIGIN?.trim()) {
      errors.push("CORS_ORIGIN must be set in production");
    }

    if (!process.env.OTP_PEPPER?.trim()) {
      errors.push("OTP_PEPPER must be set in production");
    }
  }

  if (errors.length > 0) {
    for (const message of errors) {
      logger.error("Invalid environment configuration", { message });
    }
    throw new Error(
      `Environment validation failed (${errors.length} issue(s)). See logs.`,
    );
  }
}
