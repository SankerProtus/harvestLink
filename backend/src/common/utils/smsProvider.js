import { logger } from "./logger.js";
import {
  OtpDeliveryFailedError,
  UnsupportedSmsProviderError,
} from "../../modules/auth/auth.errors.js";


const DEFAULT_MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 200;

// Mock SMS provider for development and testing
export const mockSmsProvider = {
  async send({ phone, message }) {
    // Print the raw message in development mode so you can see the OTP code
    if (process.env.NODE_ENV !== "production") {
      console.log("\n========================================");
      console.log(`💬 MOCK SMS TO ${phone}:`);
      console.log(`   ${message}`);
      console.log("========================================\n");
    }

    logger.info("Mock SMS dispatched", {
      phone,
      messageLength: message.length,
    });
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildOtpMessage(code, purpose) {
  return `Your HarvestLink verification code is ${code}. It will expire shortly. Purpose: ${purpose}.`;
}

// Sends an OTP message to the specified phone number using the provided SMS provider. Retries on failure up to a maximum number of attempts, with exponential backoff. Throws OtpDeliveryFailedError if all attempts fail.
export async function sendOtp({
  phone,
  code,
  purpose,
  provider = mockSmsProvider,
}) {
  const message = buildOtpMessage(code, purpose);

  let lastError;
  for (let attempt = 0; attempt <= DEFAULT_MAX_RETRIES; attempt += 1) {
    try {
      await provider.send({ phone, message });
      return;
    } catch (err) {
      lastError = err;
      if (attempt < DEFAULT_MAX_RETRIES) {
        await sleep(RETRY_BASE_DELAY_MS * 2 ** attempt);
      }
    }
  }

  logger.error("OTP delivery failed after retries", {
    phone,
    purpose,
    attempts: DEFAULT_MAX_RETRIES + 1,
  });
  throw new OtpDeliveryFailedError();
}

// Resolves the SMS provider to use based on the SMS_PROVIDER environment variable. Currently only supports "mock". Throws UnsupportedSmsProviderError for unsupported providers.
export function resolveSmsProvider() {
  const providerName = process.env.SMS_PROVIDER ?? "mock";

  switch (providerName) {
    case "mock":
      return mockSmsProvider;
    default:
      throw new UnsupportedSmsProviderError(
        `Unsupported SMS provider: "${providerName}". Only "mock" is currently implemented.`,
      );
  }
}
