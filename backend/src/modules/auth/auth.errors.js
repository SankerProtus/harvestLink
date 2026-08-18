import { AppError } from "../../errors/AppError.js";

//  OTP Errors

export class InvalidOTPError extends AppError {
  constructor(message = "The OTP code provided is incorrect", details = null) {
    super(message, {
      statusCode: 400,
      code: "AUTH_INVALID_OTP",
      isOperational: true,
      details,
    });
  }
}

export class OTPExpiredError extends AppError {
  constructor(message = "This OTP code has expired", details = null) {
    super(message, {
      statusCode: 400,
      code: "AUTH_OTP_EXPIRED",
      isOperational: true,
      details,
    });
  }
}

export class OTPAlreadyUsedError extends AppError {
  constructor(message = "This OTP code has already been used", details = null) {
    super(message, {
      statusCode: 400,
      code: "AUTH_OTP_ALREADY_USED",
      isOperational: true,
      details,
    });
  }
}

export class OTPMaxAttemptsExceededError extends AppError {
  constructor(
    message = "Maximum OTP verification attempts exceeded",
    details = null,
  ) {
    super(message, {
      statusCode: 429,
      code: "AUTH_OTP_MAX_ATTEMPTS_EXCEEDED",
      isOperational: true,
      details,
    });
  }
}

export class OTPRequestCooldownError extends AppError {
  constructor(
    message = "Please wait before requesting another OTP",
    details = null,
  ) {
    super(message, {
      statusCode: 429,
      code: "AUTH_OTP_REQUEST_COOLDOWN",
      isOperational: true,
      details,
    });
  }
}

// Registration / Account Errors

export class PhoneAlreadyRegisteredError extends AppError {
  constructor(
    message = "This phone number is already registered",
    details = null,
  ) {
    super(message, {
      statusCode: 409,
      code: "AUTH_PHONE_ALREADY_REGISTERED",
      isOperational: true,
      details,
    });
  }
}

export class AccountNotFoundError extends AppError {
  constructor(
    message = "No account found for this phone number",
    details = null,
  ) {
    super(message, {
      statusCode: 404,
      code: "AUTH_ACCOUNT_NOT_FOUND",
      isOperational: true,
      details,
    });
  }
}

export class AccountNotVerifiedError extends AppError {
  constructor(
    message = "This account has not been verified yet",
    details = null,
  ) {
    super(message, {
      statusCode: 403,
      code: "AUTH_ACCOUNT_NOT_VERIFIED",
      isOperational: true,
      details,
    });
  }
}

export class AccountLockedError extends AppError {
  constructor(
    message = "This account has been temporarily locked due to suspicious activity",
    details = null,
  ) {
    super(message, {
      statusCode: 423,
      code: "AUTH_ACCOUNT_LOCKED",
      isOperational: true,
      details,
    });
  }
}

export class AccountSuspendedError extends AppError {
  constructor(message = "This account has been suspended", details = null) {
    super(message, {
      statusCode: 403,
      code: "AUTH_ACCOUNT_SUSPENDED",
      isOperational: true,
      details,
    });
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid credentials provided", details = null) {
    super(message, {
      statusCode: 401,
      code: "AUTH_INVALID_CREDENTIALS",
      isOperational: true,
      details,
    });
  }
}

//  Google OAuth Errors

export class GoogleAccountAlreadyLinkedError extends AppError {
  constructor(
    message = "This Google account is already linked to another user",
    details = null,
  ) {
    super(message, {
      statusCode: 409,
      code: "AUTH_GOOGLE_ACCOUNT_ALREADY_LINKED",
      isOperational: true,
      details,
    });
  }
}

export class GoogleAccountNotLinkedError extends AppError {
  constructor(
    message = "No account is linked to this Google identity",
    details = null,
  ) {
    super(message, {
      statusCode: 404,
      code: "AUTH_GOOGLE_ACCOUNT_NOT_LINKED",
      isOperational: true,
      details,
    });
  }
}

export class GoogleTokenVerificationError extends AppError {
  constructor(
    message = "Unable to verify Google authentication token",
    details = null,
  ) {
    super(message, {
      statusCode: 401,
      code: "AUTH_GOOGLE_TOKEN_INVALID",
      isOperational: true,
      details,
    });
  }
}

//  Token / Session Errors

export class InvalidRefreshTokenError extends AppError {
  constructor(message = "The refresh token is invalid", details = null) {
    super(message, {
      statusCode: 401,
      code: "AUTH_INVALID_REFRESH_TOKEN",
      isOperational: true,
      details,
    });
  }
}

export class RefreshTokenExpiredError extends AppError {
  constructor(message = "The refresh token has expired", details = null) {
    super(message, {
      statusCode: 401,
      code: "AUTH_REFRESH_TOKEN_EXPIRED",
      isOperational: true,
      details,
    });
  }
}

export class RefreshTokenReuseError extends AppError {
  constructor(
    message = "Refresh token reuse detected; all sessions have been revoked for security",
    details = null,
  ) {
    super(message, {
      statusCode: 401,
      code: "AUTH_REFRESH_TOKEN_REUSE_DETECTED",
      isOperational: true,
      details,
    });
  }
}

export class SessionRevokedError extends AppError {
  constructor(message = "This session has been revoked", details = null) {
    super(message, {
      statusCode: 401,
      code: "AUTH_SESSION_REVOKED",
      isOperational: true,
      details,
    });
  }
}

export class InvalidAccessTokenError extends AppError {
  constructor(
    message = "The access token is invalid or malformed",
    details = null,
  ) {
    super(message, {
      statusCode: 401,
      code: "AUTH_INVALID_ACCESS_TOKEN",
      isOperational: true,
      details,
    });
  }
}

export class AccessTokenExpiredError extends AppError {
  constructor(message = "The access token has expired", details = null) {
    super(message, {
      statusCode: 401,
      code: "AUTH_ACCESS_TOKEN_EXPIRED",
      isOperational: true,
      details,
    });
  }
}

export class MaxDevicesExceededError extends AppError {
  constructor(
    message = "Maximum number of active devices reached",
    details = null,
  ) {
    super(message, {
      statusCode: 409,
      code: "AUTH_MAX_DEVICES_EXCEEDED",
      isOperational: true,
      details,
    });
  }
}

export class InvalidVerificationTokenError extends AppError {
  constructor(message = "The verification token is invalid", details = null) {
    super(message, {
      statusCode: 401,
      code: "AUTH_INVALID_VERIFICATION_TOKEN",
      isOperational: true,
      details,
    });
  }
}

export class VerificationTokenExpiredError extends AppError {
  constructor(message = "The verification token has expired", details = null) {
    super(message, {
      statusCode: 401,
      code: "AUTH_VERIFICATION_TOKEN_EXPIRED",
      isOperational: true,
      details,
    });
  }
}

export class OtpDeliveryFailedError extends AppError {
  constructor(message = "Unable to deliver OTP at this time", details = null) {
    super(message, {
      statusCode: 503,
      code: "AUTH_OTP_DELIVERY_FAILED",
      isOperational: true,
      details,
    });
  }
}

export class UnsupportedSmsProviderError extends AppError {
  constructor(
    message = "The configured SMS provider is not supported",
    details = null,
  ) {
    super(message, {
      statusCode: 500,
      code: "AUTH_UNSUPPORTED_SMS_PROVIDER",
      isOperational: false, // a misconfiguration, not a normal runtime condition
      details,
    });
  }
}