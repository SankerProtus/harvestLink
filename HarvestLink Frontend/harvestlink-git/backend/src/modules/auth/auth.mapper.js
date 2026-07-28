// Utility function to serialize Date objects to ISO strings for consistent API responses. Returns null for falsy values.
function serializeDate(date) {
  if (!date) return null;
  return date instanceof Date
    ? date.toISOString()
    : new Date(date).toISOString();
}

//  User DTOs

export function toPublicUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    role: user.role,
  };
}

export function toUserProfile(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    role: user.role,
    phone: user.phone ?? null,
    phoneVerifiedAt: serializeDate(user.phoneVerifiedAt),
    accountStatus: user.accountStatus,
    lastLoginAt: serializeDate(user.lastLoginAt),
    createdAt: serializeDate(user.createdAt),
  };
}

//  Device DTO
export function toDeviceDTO(device) {
  return {
    id: device.id,
    deviceId: device.deviceId,
    deviceName: device.deviceName ?? null,
    platform: device.platform,
    lastSeenAt: serializeDate(device.lastSeenAt),
  };
}

//  OAuthAccount DTO

export function toOAuthAccountDTO(oauthAccount) {
  return {
    id: oauthAccount.id,
    provider: oauthAccount.provider,
    email: oauthAccount.email ?? null,
    linkedAt: serializeDate(oauthAccount.createdAt),
  };
}

//  Session DTO (RefreshToken + Device, safe shape)

export function toSessionDTO(refreshToken, device = null) {
  return {
    id: refreshToken.id,
    device: device ? toDeviceDTO(device) : null,
    issuedAt: serializeDate(refreshToken.issuedAt),
    expiresAt: serializeDate(refreshToken.expiresAt),
    isRevoked: Boolean(refreshToken.revokedAt),
  };
}

export function toSessionListDTO(sessions) {
  return sessions.map(({ refreshToken, device }) =>
    toSessionDTO(refreshToken, device),
  );
}

//  Token DTOs
export function toAccessTokenDTO({ token, expiresAt }) {
  return {
    accessToken: token,
    expiresAt: serializeDate(expiresAt),
  };
}


export function toRefreshTokenDTO({ token, expiresAt }) {
  return {
    refreshToken: token,
    expiresAt: serializeDate(expiresAt),
  };
}

//  OTP DTOs
export function toOtpRequestResponse(otpCode, resendAvailableAt) {
  return {
    phone: otpCode.phone,
    purpose: otpCode.purpose,
    expiresAt: serializeDate(otpCode.expiresAt),
    resendAvailableAt: serializeDate(resendAvailableAt),
  };
}

export function toOtpVerificationResponse(otpVerificationToken) {
  return {
    verificationToken: otpVerificationToken.id,
    phone: otpVerificationToken.phone,
    purpose: otpVerificationToken.purpose,
    expiresAt: serializeDate(otpVerificationToken.expiresAt),
  };
}

//  Composite Auth Response DTOs

export function toAuthResponse({ user, accessToken, refreshToken, isNewUser }) {
  return {
    user: toPublicUser(user),
    accessToken: toAccessTokenDTO(accessToken),
    refreshToken: toRefreshTokenDTO(refreshToken),
    ...(typeof isNewUser === "boolean" ? { isNewUser } : {}),
  };
}

export function toLoginResponse({ user, accessToken, refreshToken }) {
  return toAuthResponse({ user, accessToken, refreshToken, isNewUser: false });
}

export function toRegisterResponse({ user, accessToken, refreshToken }) {
  return toAuthResponse({ user, accessToken, refreshToken, isNewUser: true });
}

export function toRefreshResponse({ accessToken, refreshToken }) {
  return {
    accessToken: toAccessTokenDTO(accessToken),
    refreshToken: toRefreshTokenDTO(refreshToken),
  };
}

export function toGoogleAuthResponse({
  user,
  accessToken,
  refreshToken,
  isNewUser,
}) {
  return toAuthResponse({ user, accessToken, refreshToken, isNewUser });
}
