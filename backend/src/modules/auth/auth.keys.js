const NAMESPACE = "auth";

// Utility function to build a namespaced key for Redis storage, ensuring consistent key structure across the auth module.
function buildKey(...segments) {
  return [NAMESPACE, ...segments].join(":");
}

// Generates a Redis key for tracking OTP resend cooldowns, based on the phone number and purpose of the OTP.
export function otpResendCooldownKey(phone, purpose) {
  return buildKey("otp", "cooldown", purpose, phone);
}

// Generates a Redis key for tracking the count of OTP requests made for a specific phone number and purpose, allowing enforcement of request limits.
export function otpRequestCountKey(phone, purpose) {
  return buildKey("otp", "request-count", purpose, phone);
}

// Generates a Redis key for tracking the number of OTP verification attempts for a specific OTP code ID, enabling enforcement of maximum attempt limits.
export function otpVerifyAttemptsKey(otpCodeId) {
  return buildKey("otp", "verify-attempts", otpCodeId);
}

// Generates a Redis key for tracking the number of failed login attempts for a specific phone number, allowing enforcement of login attempt limits.
export function loginAttemptCountKey(phone) {
  return buildKey("login", "attempt-count", phone);
}

// Tracks failed login attempts per IP address, for
export function ipRateLimitKey(routeName, ipAddress) {
  return buildKey("rate-limit", routeName, ipAddress);
}

// Tracks failed login attempts per user, for

export function refreshTokenFamilyRevokedKey(family) {
  return buildKey("refresh-token", "family-revoked", family);
}

// Tracks the number of active sessions for a user, allowing enforcement of
// SESSION_CONFIG.MAX_ACTIVE_SESSIONS without a DB query on every login.
export function activeSessionCountKey(userId) {
  return buildKey("session", "active-count", userId);
}

// Generates a Redis key for storing the state parameter used in Google OAuth flows, ensuring that the state can be validated upon callback to prevent CSRF attacks.
export function googleOAuthStateKey(state) {
  return buildKey("google-oauth", "state", state);
}

// OTP Verification Token Keys
export function otpVerificationTokenKey(tokenId) {
  return buildKey("otp-verification-token", tokenId);
}
