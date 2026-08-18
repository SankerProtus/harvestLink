// Auth module event names
export const AUTH_EVENTS = Object.freeze({
  USER_REGISTERED: "auth.user.registered",
  LOGIN_SUCCEEDED: "auth.login.succeeded",
  LOGIN_FAILED: "auth.login.failed",
  LOGOUT: "auth.logout",
  REFRESH_TOKEN_ROTATED: "auth.refresh_token.rotated",
  PASSWORD_CHANGED: "auth.password.changed",
  PASSWORD_RESET_REQUESTED: "auth.password.reset_requested",
  PASSWORD_RESET_COMPLETED: "auth.password.reset_completed",
  OTP_REQUESTED: "auth.otp.requested",
  OTP_VERIFIED: "auth.otp.verified",
  PHONE_VERIFIED: "auth.phone.verified",
  DEVICE_REGISTERED: "auth.device.registered",
  SESSION_REVOKED: "auth.session.revoked",
  GOOGLE_ACCOUNT_LINKED: "auth.google_account.linked",
  GOOGLE_LOGIN: "auth.google.login",
});

// Event creation function
function createEvent(eventName, payload, occurredAt = new Date()) {
  return {
    eventName,
    occurredAt: occurredAt.toISOString(),
    payload,
  };
}

// Event creation functions for specific auth events
export function createUserRegisteredEvent({ userId, phone, role, provider }) {
  return createEvent(AUTH_EVENTS.USER_REGISTERED, {
    userId,
    phone,
    role,
    provider,
  });
}

export function createLoginSucceededEvent({
  userId,
  phone,
  deviceId,
  ipAddress,
}) {
  return createEvent(AUTH_EVENTS.LOGIN_SUCCEEDED, {
    userId,
    phone,
    deviceId,
    ipAddress,
  });
}

// Event creation function for login failure, capturing the reason and IP address. User ID is optional since the user may not exist yet.
export function createLoginFailedEvent({
  userId = null,
  phone,
  reason,
  ipAddress,
}) {
  return createEvent(AUTH_EVENTS.LOGIN_FAILED, {
    userId,
    phone,
    reason,
    ipAddress,
  });
}

export function createLogoutEvent({ userId, deviceId, allDevices }) {
  return createEvent(AUTH_EVENTS.LOGOUT, { userId, deviceId, allDevices });
}

export function createRefreshTokenRotatedEvent({ userId, family, deviceId }) {
  return createEvent(AUTH_EVENTS.REFRESH_TOKEN_ROTATED, {
    userId,
    family,
    deviceId,
  });
}

// Event creation function for password change, capturing the user ID. This event is triggered when a user successfully changes their password.
export function createPasswordChangedEvent({ userId }) {
  return createEvent(AUTH_EVENTS.PASSWORD_CHANGED, { userId });
}

export function createPasswordResetRequestedEvent({ userId, phone }) {
  return createEvent(AUTH_EVENTS.PASSWORD_RESET_REQUESTED, { userId, phone });
}

export function createPasswordResetCompletedEvent({ userId }) {
  return createEvent(AUTH_EVENTS.PASSWORD_RESET_COMPLETED, { userId });
}

export function createOtpRequestedEvent({ phone, purpose, ipAddress }) {
  return createEvent(AUTH_EVENTS.OTP_REQUESTED, { phone, purpose, ipAddress });
}

export function createOtpVerifiedEvent({ phone, purpose }) {
  return createEvent(AUTH_EVENTS.OTP_VERIFIED, { phone, purpose });
}

export function createPhoneVerifiedEvent({ userId, phone }) {
  return createEvent(AUTH_EVENTS.PHONE_VERIFIED, { userId, phone });
}

export function createDeviceRegisteredEvent({ userId, deviceId, platform }) {
  return createEvent(AUTH_EVENTS.DEVICE_REGISTERED, {
    userId,
    deviceId,
    platform,
  });
}

export function createSessionRevokedEvent({ userId, refreshTokenId, reason }) {
  return createEvent(AUTH_EVENTS.SESSION_REVOKED, {
    userId,
    refreshTokenId,
    reason,
  });
}

export function createGoogleAccountLinkedEvent({ userId, email }) {
  return createEvent(AUTH_EVENTS.GOOGLE_ACCOUNT_LINKED, { userId, email });
}

export function createGoogleLoginEvent({ userId, email, isNewUser, deviceId }) {
  return createEvent(AUTH_EVENTS.GOOGLE_LOGIN, {
    userId,
    email,
    isNewUser,
    deviceId,
  });
}
