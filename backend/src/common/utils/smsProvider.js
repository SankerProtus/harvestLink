import { logger } from "./logger.js";
import {
  OtpDeliveryFailedError,
  UnsupportedSmsProviderError,
} from "../../modules/auth/auth.errors.js";


const DEFAULT_MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 200;

function maskPhone(phone) {
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length < 4) return "[MASKED]";

  const prefix = phone.startsWith("+") ? phone.slice(0, 5) : digits.slice(0, 4);
  return `${prefix}****${digits.slice(-2)}`;
}

// Mock SMS provider for development and testing
export const mockSmsProvider = {
  async send({ phone, message }) {
    // Print the raw message in development mode so you can see the OTP code
    if (process.env.NODE_ENV !== "production") {
      console.log("\n========================================");
      console.log(`💬 MOCK SMS TO ${maskPhone(phone)}:`);
      console.log(`   ${message}`);
      console.log("========================================\n");
    }

    logger.info("Mock SMS dispatched", {
      phone,
      messageLength: message.length,
    });
  },
};

const ARKESEL_SEND_URL = "https://sms.arkesel.com/api/v2/sms/send";

function normalizePhoneForArkesel(phone) {
  const digits = phone.replace(/[^\d]/g, "");

  if (phone.startsWith("+")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `233${digits.slice(1)}`;
  }

  return digits;
}

export const arkeselSmsProvider = {
  async send({ phone, message }) {
    const apiKey = process.env.ARKESEL_API_KEY;
    const senderId = process.env.ARKESEL_SENDER_ID;

    if (!apiKey || !senderId) {
      throw new Error(
        "Arkesel SMS provider is not configured. Set ARKESEL_API_KEY and ARKESEL_SENDER_ID.",
      );
    }

    const headers = {
      "api-key": apiKey,
      "Content-Type": "application/json",
    };

    const params = new URLSearchParams({
      sender: senderId,
      message,
      recipients: normalizePhoneForArkesel(phone),
    });

    const response = await fetch(`${ARKESEL_SEND_URL}?${params.toString()}`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: senderId,
        message,
        recipients: [normalizePhoneForArkesel(phone)],
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.code !== "ok") {
      throw new Error(
        `Arkesel SMS send failed (${response.status}): ${result.message ?? JSON.stringify(result)}`,
      );
    }

    logger.info("Arkesel SMS dispatched", { phone: maskPhone(phone) });
  },
};

export const telegramSmsProvider = {
  async send({ phone, message }) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      throw new Error(
        "Telegram SMS provider is not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.",
      );
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const body = {
      chat_id: chatId,
      text: message,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Telegram SMS send failed (${response.status}): ${await response.text()}`,
      );
    }

    logger.info("Telegram SMS dispatched", { phone: maskPhone(phone) });
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildOtpMessage(code, purpose) {
  return `Your HarvestLink verification code is ${code}. It will expire shortly. Purpose: ${purpose}.`;
}

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

export function resolveSmsProvider() {
  const providerName = process.env.SMS_PROVIDER ?? "mock";

  switch (providerName) {
    case "mock":
      return mockSmsProvider;
    case "arkesel":
      return arkeselSmsProvider;
    case "telegram":
      return telegramSmsProvider;
    default:
      throw new UnsupportedSmsProviderError(
        `Unsupported SMS provider: "${providerName}". Supported providers are "mock", "arkesel", and "telegram".`,
      );
  }
}