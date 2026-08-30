export const ERROR_MESSAGES = Object.freeze({
  // ─── Auth: OTP ───────────────────────────────────────────
  AUTH_INVALID_OTP: "That code doesn't look right. Please try again.",
  AUTH_OTP_EXPIRED: "This code has expired. Request a new one.",
  AUTH_OTP_ALREADY_USED: "This code has already been used. Request a new one.",
  AUTH_OTP_MAX_ATTEMPTS_EXCEEDED:
    "Too many incorrect attempts. Please request a new code.",
  AUTH_OTP_REQUEST_COOLDOWN:
    "Please wait a moment before requesting another code.",
  AUTH_OTP_DELIVERY_FAILED:
    "We couldn't send your code right now. Please try again shortly.",

  //  Auth: Account / Registration.
  AUTH_PHONE_ALREADY_REGISTERED:
    "That phone number is already registered. Try logging in instead.",
  AUTH_ACCOUNT_NOT_FOUND:
    "No account found for this phone number. Would you like to register instead?",
  AUTH_ACCOUNT_NOT_VERIFIED: "This account has not been verified yet.",
  AUTH_ACCOUNT_LOCKED:
    "This account has been temporarily locked. Please try again later.",
  AUTH_ACCOUNT_SUSPENDED: "This account has been suspended.",
  AUTH_INVALID_CREDENTIALS: "Invalid credentials. Please try again.",
  AUTH_INVALID_VERIFICATION_TOKEN:
    "Your verification has expired. Please start again.",
  AUTH_VERIFICATION_TOKEN_EXPIRED:
    "Your verification has expired. Please start again.",

  //  Auth: Google Sign-In
  AUTH_GOOGLE_ACCOUNT_ALREADY_LINKED:
    "This Google account is already linked to an account.",
  AUTH_GOOGLE_ACCOUNT_NOT_LINKED:
    "No account is linked to this Google identity.",
  AUTH_GOOGLE_TOKEN_INVALID: "Google sign-in failed. Please try again.",

  // ─── Auth: Tokens / Sessions ──────────────────────────────
  AUTH_INVALID_REFRESH_TOKEN:
    "Your session is no longer valid. Please log in again.",
  AUTH_REFRESH_TOKEN_EXPIRED: "Your session has expired. Please log in again.",
  // Special-cased separately in getErrorMessage() below — this
  // entry is the fallback if that special handling is ever bypassed.
  AUTH_REFRESH_TOKEN_REUSE_DETECTED:
    "For your security, you've been logged out of all devices.",
  AUTH_SESSION_REVOKED: "This session has been signed out.",
  AUTH_INVALID_ACCESS_TOKEN:
    "Your session is no longer valid. Please log in again.",
  AUTH_ACCESS_TOKEN_EXPIRED: "Your session has expired. Please log in again.",
  AUTH_MAX_DEVICES_EXCEEDED:
    "You've reached the maximum number of signed-in devices.",

  // ─── Marketplace ──────────────────────────────────────────
  MARKETPLACE_LISTING_NOT_FOUND: "This listing no longer exists.",
  MARKETPLACE_LISTING_UNAVAILABLE: "This listing is no longer available.",
  MARKETPLACE_LISTING_ALREADY_SOLD: "This listing has already sold out.",
  MARKETPLACE_UNAUTHORIZED_LISTING_ACCESS:
    "You don't have permission to do that with this listing.",
  MARKETPLACE_INVALID_STATUS_TRANSITION:
    "This listing can't be changed to that status right now.",
  MARKETPLACE_DUPLICATE_LISTING:
    "You already have an active listing with this title.",
  MARKETPLACE_INVALID_CROP_TYPE: "Please choose a valid crop type.",
  MARKETPLACE_INVALID_QUANTITY_UNIT: "Please choose a valid quantity unit.",
  MARKETPLACE_INSUFFICIENT_LISTING_QUANTITY:
    "There isn't enough stock left to complete this.",

  // ─── Delivery Tracking ────────────────────────────────────
  DELIVERY_ORDER_NOT_FOUND: "This order could not be found.",
  DELIVERY_UNAUTHORIZED_ORDER_ACCESS:
    "You don't have permission to view or manage this order.",
  DELIVERY_INVALID_STATUS_TRANSITION:
    "This order can't be moved to that status right now.",
  DELIVERY_INSUFFICIENT_LISTING_QUANTITY:
    "There isn't enough stock left to complete this.",
  DELIVERY_LOCATION_REPORTING_NOT_ALLOWED:
    "Location can only be reported while a delivery is in transit.",

  // ─── Generic / Common ─────────────────────────────────────
  BAD_REQUEST: "That request could not be processed.",
  VALIDATION_ERROR: "Please check the highlighted fields and try again.",
  UNAUTHORIZED: "Please log in to continue.",
  FORBIDDEN: "You don't have permission to do that.",
  NOT_FOUND: "The requested item could not be found.",
  CONFLICT: "This action conflicts with the current state.",
  RATE_LIMIT_EXCEEDED:
    "You've made too many requests. Please wait a moment and try again.",
  INTERNAL_SERVER_ERROR: "Something went wrong on our end. Please try again.",
  SERVICE_UNAVAILABLE:
    "This service isn't available right now. Please try again shortly.",
});

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

export function getErrorMessage(error) {
  if (!error?.code) return FALLBACK_MESSAGE;
  return ERROR_MESSAGES[error.code] ?? FALLBACK_MESSAGE;
}

// Formats a rate-limit error with a live "try again in Xm Ys" countdown
// in place of the static fallback message. `remainingSeconds` should
// come from useRetryCountdown(error); pass null/undefined to fall back
// to the plain message (e.g. before the hook has initialized).
export function getRateLimitMessage(remainingSeconds) {
  if (remainingSeconds == null) {
    return ERROR_MESSAGES.RATE_LIMIT_EXCEEDED;
  }
  if (remainingSeconds <= 0) {
    return "You can try again now.";
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formatted =
    minutes > 0 ? `${minutes}m ${String(seconds).padStart(2, "0")}s` : `${seconds}s`;

  return `Too many attempts. Try again in ${formatted}.`;
}

export function isValidationError(error) {
  return error?.code === "VALIDATION_ERROR";
}

export function isRefreshTokenReuseError(error) {
  return error?.code === "AUTH_REFRESH_TOKEN_REUSE_DETECTED";
}