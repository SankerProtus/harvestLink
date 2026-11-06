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
    if (!process.env.JWT_ACCESS_SECRET?.trim()) {
      errors.push("JWT_ACCESS_SECRET must be set in production");
    }

    if (!process.env.JWT_REFRESH_SECRET?.trim()) {
      errors.push("JWT_REFRESH_SECRET must be set in production");
    }

    if (process.env.OTP_DEBUG_EXPOSE === "true") {
      errors.push("OTP_DEBUG_EXPOSE must not be enabled in production");
    }

    const smsProvider = process.env.SMS_PROVIDER ?? "mock";
    if (smsProvider === "mock") {
      errors.push(
        'SMS_PROVIDER must not be "mock" in production (configure a real provider such as "arkesel")',
      );
    }
    if (smsProvider === "arkesel") {
      if (!process.env.ARKESEL_API_KEY?.trim()) {
        errors.push("ARKESEL_API_KEY must be set when SMS_PROVIDER is arkesel");
      }
      if (!process.env.ARKESEL_SENDER_ID?.trim()) {
        errors.push("ARKESEL_SENDER_ID must be set when SMS_PROVIDER is arkesel");
      }
    }
    if (smsProvider === "telegram") {
      if (!process.env.TELEGRAM_BOT_TOKEN?.trim()) {
        errors.push(
          "TELEGRAM_BOT_TOKEN must be set when SMS_PROVIDER is telegram",
        );
      }
      if (!process.env.TELEGRAM_CHAT_ID?.trim()) {
        errors.push("TELEGRAM_CHAT_ID must be set when SMS_PROVIDER is telegram");
      }
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
