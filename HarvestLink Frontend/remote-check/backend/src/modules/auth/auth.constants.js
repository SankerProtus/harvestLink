export const USER_ROLES = Object.freeze({
  FARMER: "FARMER",
  BUYER: "BUYER",
  ADMIN: "ADMIN",
});

export const AUTH_PROVIDERS = Object.freeze({
  PHONE_OTP: "PHONE_OTP",
  GOOGLE: "GOOGLE",
});

export const ACCOUNT_STATUS = Object.freeze({
  PENDING_VERIFICATION: "PENDING_VERIFICATION",
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
  DELETED: "DELETED",
});

export const OTP_CONFIG = Object.freeze({
  CODE_LENGTH: 6,
  EXPIRY_MINUTES: 5,
  MAX_VERIFY_ATTEMPTS: 5,
  RESEND_COOLDOWN_SECONDS: 60,
  MAX_RESENDS_PER_HOUR: 5,
});

export const OTP_PURPOSES = Object.freeze({
  REGISTRATION: "REGISTRATION",
  LOGIN: "LOGIN",
  CHANGE_PHONE: "CHANGE_PHONE",
});

export const TOKEN_CONFIG = Object.freeze({
  ACCESS_TOKEN_EXPIRY: "15m",
  REFRESH_TOKEN_EXPIRY_DAYS: 30,
  ISSUER: "harvestlink-api",
  AUDIENCE: "harvestlink-app",
  ALGORITHM: "HS256",
});

export const SESSION_CONFIG = Object.freeze({
  MAX_ACTIVE_DEVICES: 5,
  REFRESH_TOKEN_BYTES: 64,
});

export const PHONE_CONFIG = Object.freeze({
  SUPPORTED_COUNTRY_CODE: "+233",
  E164_REGEX: /^\+233\d{9}$/,
});

export const RATE_LIMIT_CONFIG = Object.freeze({
  OTP_REQUEST_WINDOW_MINUTES: 60,
  OTP_REQUEST_MAX: 5,
  LOGIN_ATTEMPT_WINDOW_MINUTES: 15,
  LOGIN_ATTEMPT_MAX: 10,
});

export const GOOGLE_OAUTH_CONFIG = Object.freeze({
  SCOPES: ["openid", "email", "profile"],
  REDIRECT_PATH: "/api/auth/google/callback",
});

export const COOKIE_CONFIG = Object.freeze({
  REFRESH_TOKEN_COOKIE_NAME: "harvestlink_rt",
  HTTP_ONLY: true,
  SECURE: true,
  SAME_SITE: "strict",
  PATH: "/api/auth/refresh",
});
