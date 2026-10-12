import { randomInt, timingSafeEqual } from "node:crypto";
import { hmacSha256 } from "./crypto.js";
import { OTP_CONFIG } from "../../modules/auth/auth.constants.js";

function resolveOtpPepper() {
  const pepper = process.env.OTP_PEPPER?.trim();
  if (pepper) {
    return pepper;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("OTP_PEPPER must be set in production");
  }
  return "dev-insecure-otp-pepper";
}

// Generation
export function generateOtpCode(length = OTP_CONFIG.CODE_LENGTH) {
  const max = 10 ** length;
  const value = randomInt(0, max);
  return value.toString().padStart(length, "0");
}


// Hashing (HMAC with server-side pepper — not reversible from DB hash alone)
export function hashOtpCode(code) {
  return hmacSha256(resolveOtpPepper(), String(code));
}

// Verification
export function verifyOtpCode(submittedCode, storedHash) {
  const submittedHash = hashOtpCode(submittedCode);

  const a = Buffer.from(submittedHash, "utf8");
  const b = Buffer.from(storedHash, "utf8");

  if (a.length !== b.length) {
    return false;
  }

  return timingSafeEqual(a, b);
}

// Expiration

export function isOtpExpired(expiresAt, now = new Date()) {
  return expiresAt.getTime() <= now.getTime();
}

// Computes the expiry date for an OTP based on the current time and the configured expiry duration.
export function computeOtpExpiry(
  now = new Date(),
  expiryMinutes = OTP_CONFIG.EXPIRY_MINUTES,
) {
  return new Date(now.getTime() + expiryMinutes * 60 * 1000);
}
