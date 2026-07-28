import { randomUUID } from "node:crypto";

import {
  createUserWithSession,
  createUserWithOAuthAndSession,
  findUserByPhone,
  findUserById,
  updateUserPhone,
  markUserPhoneVerified,
  updateUserLastLoginAt,
  findLatestActiveOtpCode,
  createOtpCode,
  incrementOtpAttempts,
  countOtpRequestsSince,
  consumeOtpAndCreateVerificationToken,
  findOtpVerificationTokenById,
  markOtpVerificationTokenConsumed,
  findOAuthAccountByProvider,
  createOAuthAccount,
  findOAuthAccountsByUserId,
  upsertDevice,
  createRefreshToken,
  findRefreshTokenByHash,
  findRefreshTokenWithRelationsByHash,
  revokeRefreshTokenById,
  revokeRefreshTokenFamily,
  revokeAllRefreshTokensForUser,
  rotateRefreshToken,
  listActiveSessionsForUser,
} from "./auth.repository.js";

import {
  InvalidOTPError,
  OTPExpiredError,
  OTPMaxAttemptsExceededError,
  OTPRequestCooldownError,
  PhoneAlreadyRegisteredError,
  InvalidVerificationTokenError,
  VerificationTokenExpiredError,
  InvalidRefreshTokenError,
  RefreshTokenExpiredError,
  RefreshTokenReuseError,
  AccountSuspendedError,
  GoogleAccountAlreadyLinkedError,
  InvalidAccessTokenError,
  AccessTokenExpiredError,
} from "./auth.errors.js";

import {
  NotFoundError,
  BadRequestError,
  RateLimitError,
} from "../../errors/commonErrors.js";

import {
  ACCOUNT_STATUS,
  OTP_CONFIG,
  RATE_LIMIT_CONFIG,
  AUTH_PROVIDERS,
} from "./auth.constants.js";

import {
  generateOtpCode,
  hashOtpCode,
  verifyOtpCode,
  isOtpExpired,
  computeOtpExpiry,
} from "../../common/utils/otp.js";
import { sha256Hash } from "../../common/utils/crypto.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken as verifyAccessTokenJwt,
  verifyRefreshToken,
  computeAccessTokenExpiry,
  computeRefreshTokenExpiry,
} from "../../common/utils/jwt.js";
import { verifyAndNormalizeGoogleIdentity } from "../../common/utils/googleOAuth.js";

import {
  toOtpRequestResponse,
  toOtpVerificationResponse,
  toRegisterResponse,
  toLoginResponse,
  toRefreshResponse,
  toGoogleAuthResponse,
  toUserProfile,
  toOAuthAccountDTO,
  toSessionListDTO,
} from "./auth.mapper.js";

import {
  createOtpRequestedEvent,
  createOtpVerifiedEvent,
  createUserRegisteredEvent,
  createDeviceRegisteredEvent,
  createLoginSucceededEvent,
  createLoginFailedEvent,
  createLogoutEvent,
  createRefreshTokenRotatedEvent,
  createPhoneVerifiedEvent,
  createSessionRevokedEvent,
  createGoogleAccountLinkedEvent,
  createGoogleLoginEvent,
} from "./auth.events.js";

import { sendOtp, resolveSmsProvider } from "../../common/utils/smsProvider.js";

// Shared/private helpers
const smsProvider = resolveSmsProvider();
const OTP_VERIFICATION_TOKEN_TTL_MINUTES = 10;

function issueSessionTokens({ userId, role }) {
  const family = randomUUID();

  const accessToken = signAccessToken({ userId, role });
  const refreshToken = signRefreshToken({ userId, family });

  const accessTokenExpiresAt = computeAccessTokenExpiry();
  const refreshTokenExpiresAt = computeRefreshTokenExpiry();

  return {
    family,
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
    refreshTokenHash: sha256Hash(refreshToken),
  };
}

function buildDeviceData(device) {
  if (!device) return null;
  return {
    deviceId: device.deviceId,
    deviceName: device.deviceName ?? null,
    platform: device.platform,
    pushToken: device.pushToken ?? null,
  };
}

function computeOtpVerificationTokenExpiry(now = new Date()) {
  return new Date(
    now.getTime() + OTP_VERIFICATION_TOKEN_TTL_MINUTES * 60 * 1000,
  );
}

// Shared verification-token validity check.
function assertVerificationTokenValid(record, { phone, purpose }) {
  if (!record) {
    throw new InvalidVerificationTokenError();
  }
  if (record.consumedAt) {
    throw new InvalidVerificationTokenError(
      "Verification token has already been used",
    );
  }
  if (isOtpExpired(record.expiresAt)) {
    throw new VerificationTokenExpiredError();
  }
  if (record.phone !== phone || record.purpose !== purpose) {
    throw new InvalidVerificationTokenError(
      "Verification token does not match this request",
    );
  }
}

/**
 * Shared account-usability gate for any flow that authenticates an
 * existing user (login, refresh, Google sign-in).
 */
function assertAccountIsUsable(user) {
  if (user.accountStatus === ACCOUNT_STATUS.SUSPENDED) {
    throw new AccountSuspendedError();
  }
  if (user.accountStatus === ACCOUNT_STATUS.DELETED) {
    throw new NotFoundError("This account no longer exists");
  }
}

// OTP Request

export async function requestOtp({ phone, purpose, ipAddress }) {
  if (purpose === "REGISTRATION") {
    const existingUser = await findUserByPhone(phone);
    if (existingUser) {
      throw new PhoneAlreadyRegisteredError();
    }
  }

  const windowStart = new Date(
    Date.now() - RATE_LIMIT_CONFIG.OTP_REQUEST_WINDOW_MINUTES * 60 * 1000,
  );
  const recentRequestCount = await countOtpRequestsSince(
    phone,
    purpose,
    windowStart,
  );
  if (recentRequestCount >= RATE_LIMIT_CONFIG.OTP_REQUEST_MAX) {
    throw new RateLimitError("Too many OTP requests. Please try again later.");
  }

  const activeCode = await findLatestActiveOtpCode(phone, purpose);
  if (activeCode) {
    const cooldownEndsAt = new Date(
      activeCode.createdAt.getTime() +
        OTP_CONFIG.RESEND_COOLDOWN_SECONDS * 1000,
    );
    if (cooldownEndsAt > new Date()) {
      throw new OTPRequestCooldownError();
    }
  }

  const rawCode = generateOtpCode();
  const codeHash = hashOtpCode(rawCode);
  const expiresAt = computeOtpExpiry();

  const otpCode = await createOtpCode({
    phone,
    purpose,
    codeHash,
    expiresAt,
    requestIp: ipAddress ?? null,
  });

  await sendOtp({ phone, code: rawCode, purpose, provider: smsProvider });

  createOtpRequestedEvent({ phone, purpose, ipAddress });

  const resendAvailableAt = new Date(
    otpCode.createdAt.getTime() + OTP_CONFIG.RESEND_COOLDOWN_SECONDS * 1000,
  );

  return toOtpRequestResponse(otpCode, resendAvailableAt);
}

// OTP Verification

export async function verifyOtp({ phone, code, purpose }) {
  const otpCode = await findLatestActiveOtpCode(phone, purpose);
  if (!otpCode) {
    throw new InvalidOTPError("No active OTP found for this phone number");
  }

  if (otpCode.attempts >= OTP_CONFIG.MAX_VERIFY_ATTEMPTS) {
    throw new OTPMaxAttemptsExceededError();
  }

  if (isOtpExpired(otpCode.expiresAt)) {
    throw new OTPExpiredError();
  }

  const isValid = verifyOtpCode(code, otpCode.codeHash);
  if (!isValid) {
    await incrementOtpAttempts(otpCode.id);
    throw new InvalidOTPError();
  }

  const verificationTokenData = {
    phone,
    purpose,
    expiresAt: computeOtpVerificationTokenExpiry(),
    otpCodeId: otpCode.id,
  };

  const verificationToken = await consumeOtpAndCreateVerificationToken({
    otpCodeId: otpCode.id,
    verificationTokenData,
  });

  createOtpVerifiedEvent({ phone, purpose });

  return toOtpVerificationResponse(verificationToken);
}

// Phone/OTP Registration

export async function registerWithPhone({
  phone,
  fullName,
  role,
  otpVerificationToken,
  device,
}) {
  const verificationRecord =
    await findOtpVerificationTokenById(otpVerificationToken);
  assertVerificationTokenValid(verificationRecord, {
    phone,
    purpose: "REGISTRATION",
  });

  const existingUser = await findUserByPhone(phone);
  if (existingUser) {
    throw new PhoneAlreadyRegisteredError();
  }

  const userId = randomUUID();
  const {
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
    refreshTokenHash,
    family,
  } = issueSessionTokens({ userId, role });

  const userData = {
    id: userId,
    fullName,
    role,
    phone,
    phoneVerifiedAt: new Date(),
    accountStatus: ACCOUNT_STATUS.ACTIVE,
  };

  const deviceData = buildDeviceData(device);

  const refreshTokenData = {
    tokenHash: refreshTokenHash,
    family,
    expiresAt: refreshTokenExpiresAt,
  };

  const { user, device: createdDevice } = await createUserWithSession({
    userData,
    deviceData,
    refreshTokenData,
  });

  await markOtpVerificationTokenConsumed(otpVerificationToken);

  createUserRegisteredEvent({
    userId: user.id,
    phone,
    role,
    provider: AUTH_PROVIDERS.PHONE_OTP,
  });
  if (createdDevice) {
    createDeviceRegisteredEvent({
      userId: user.id,
      deviceId: createdDevice.deviceId,
      platform: createdDevice.platform,
    });
  }

  return toRegisterResponse({
    user,
    accessToken: { token: accessToken, expiresAt: accessTokenExpiresAt },
    refreshToken: { token: refreshToken, expiresAt: refreshTokenExpiresAt },
  });
}

// Phone/OTP Login

export async function loginWithPhone({
  phone,
  otpVerificationToken,
  device,
  ipAddress,
}) {
  const verificationRecord =
    await findOtpVerificationTokenById(otpVerificationToken);
  assertVerificationTokenValid(verificationRecord, { phone, purpose: "LOGIN" });

  const user = await findUserByPhone(phone);
  if (!user) {
    createLoginFailedEvent({ phone, reason: "USER_NOT_FOUND", ipAddress });
    throw new NotFoundError("No account found for this phone number");
  }

  assertAccountIsUsable(user);

  const {
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
    refreshTokenHash,
    family,
  } = issueSessionTokens({ userId: user.id, role: user.role });

  let createdDevice = null;
  if (device) {
    createdDevice = await upsertDevice({
      userId: user.id,
      deviceId: device.deviceId,
      deviceName: device.deviceName ?? null,
      platform: device.platform,
      pushToken: device.pushToken ?? null,
    });
  }

  await createRefreshToken({
    tokenHash: refreshTokenHash,
    family,
    userId: user.id,
    deviceId: createdDevice ? createdDevice.id : null,
    expiresAt: refreshTokenExpiresAt,
  });

  await updateUserLastLoginAt(user.id);
  await markOtpVerificationTokenConsumed(otpVerificationToken);

  createLoginSucceededEvent({
    userId: user.id,
    phone,
    deviceId: device?.deviceId ?? null,
    ipAddress: ipAddress ?? null,
  });

  return toLoginResponse({
    user,
    accessToken: { token: accessToken, expiresAt: accessTokenExpiresAt },
    refreshToken: { token: refreshToken, expiresAt: refreshTokenExpiresAt },
  });
}

// Refresh Session (rotation with reuse detection)

export async function refreshSession({ refreshToken }) {
  let claims;
  try {
    claims = verifyRefreshToken(refreshToken);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new RefreshTokenExpiredError();
    }
    throw new InvalidRefreshTokenError();
  }

  const tokenHash = sha256Hash(refreshToken);
  const existingToken = await findRefreshTokenWithRelationsByHash(tokenHash);

  if (!existingToken) {
    throw new InvalidRefreshTokenError();
  }

  if (existingToken.revokedAt) {
    await revokeRefreshTokenFamily(existingToken.family, "REUSE_DETECTED");
    throw new RefreshTokenReuseError();
  }

  if (existingToken.expiresAt <= new Date()) {
    throw new RefreshTokenExpiredError();
  }

  if (
    existingToken.family !== claims.family ||
    existingToken.userId !== claims.userId
  ) {
    throw new InvalidRefreshTokenError();
  }

  const { user } = existingToken;
  assertAccountIsUsable(user);

  const newRefreshToken = signRefreshToken({
    userId: user.id,
    family: existingToken.family,
  });
  const newAccessToken = signAccessToken({ userId: user.id, role: user.role });
  const newRefreshTokenExpiresAt = computeRefreshTokenExpiry();
  const newAccessTokenExpiresAt = computeAccessTokenExpiry();

  await rotateRefreshToken({
    oldTokenId: existingToken.id,
    revokedReason: "ROTATED",
    newTokenData: {
      tokenHash: sha256Hash(newRefreshToken),
      family: existingToken.family,
      userId: user.id,
      deviceId: existingToken.deviceId,
      expiresAt: newRefreshTokenExpiresAt,
    },
  });

  createRefreshTokenRotatedEvent({
    userId: user.id,
    family: existingToken.family,
    deviceId: existingToken.deviceId,
  });

  return toRefreshResponse({
    accessToken: { token: newAccessToken, expiresAt: newAccessTokenExpiresAt },
    refreshToken: {
      token: newRefreshToken,
      expiresAt: newRefreshTokenExpiresAt,
    },
  });
}

// Logout

export async function logout({ refreshToken, allDevices }) {
  const tokenHash = sha256Hash(refreshToken);
  const existingToken = await findRefreshTokenByHash(tokenHash);

  if (!existingToken) {
    throw new InvalidRefreshTokenError();
  }

  if (allDevices) {
    await revokeAllRefreshTokensForUser(
      existingToken.userId,
      "LOGOUT_ALL_DEVICES",
    );
  } else {
    await revokeRefreshTokenById(existingToken.id, "LOGOUT");
  }

  createLogoutEvent({
    userId: existingToken.userId,
    deviceId: existingToken.deviceId,
    allDevices: Boolean(allDevices),
  });

  return { success: true };
}

// Resend OTP

export async function resendOtp({ phone, purpose }) {
  const activeCode = await findLatestActiveOtpCode(phone, purpose);

  if (activeCode) {
    const cooldownEndsAt = new Date(
      activeCode.createdAt.getTime() +
        OTP_CONFIG.RESEND_COOLDOWN_SECONDS * 1000,
    );
    if (cooldownEndsAt > new Date()) {
      throw new OTPRequestCooldownError();
    }
  }

  const windowStart = new Date(Date.now() - 60 * 60 * 1000);
  const recentCount = await countOtpRequestsSince(phone, purpose, windowStart);
  if (recentCount >= OTP_CONFIG.MAX_RESENDS_PER_HOUR) {
    throw new RateLimitError("Maximum OTP resends reached for this hour.");
  }

  return requestOtp({ phone, purpose, ipAddress: null });
}

// Google Sign-In (login or first-time registration)

export async function signInWithGoogle({ idToken, role, device, ipAddress }) {
  const identity = await verifyAndNormalizeGoogleIdentity(idToken);

  const existingOAuthAccount = await findOAuthAccountByProvider(
    AUTH_PROVIDERS.GOOGLE,
    identity.providerUserId,
  );

  if (existingOAuthAccount) {
    const user = await findUserById(existingOAuthAccount.userId);
    if (!user) {
      throw new NotFoundError("Linked account could not be found");
    }
    assertAccountIsUsable(user);

    const {
      family,
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      refreshTokenHash,
    } = issueSessionTokens({ userId: user.id, role: user.role });

    let createdDevice = null;
    if (device) {
      createdDevice = await upsertDevice({
        userId: user.id,
        deviceId: device.deviceId,
        deviceName: device.deviceName ?? null,
        platform: device.platform,
        pushToken: device.pushToken ?? null,
      });
    }

    await createRefreshToken({
      tokenHash: refreshTokenHash,
      family,
      userId: user.id,
      deviceId: createdDevice ? createdDevice.id : null,
      expiresAt: refreshTokenExpiresAt,
    });

    await updateUserLastLoginAt(user.id);

    createGoogleLoginEvent({
      userId: user.id,
      email: identity.email,
      isNewUser: false,
      deviceId: device?.deviceId ?? null,
    });

    return toGoogleAuthResponse({
      user,
      accessToken: { token: accessToken, expiresAt: accessTokenExpiresAt },
      refreshToken: { token: refreshToken, expiresAt: refreshTokenExpiresAt },
      isNewUser: false,
    });
  }

  // First-time Google sign-in: register a new account.
  if (!role) {
    throw new BadRequestError("Role is required for first-time Google sign-in");
  }

  const userId = randomUUID();
  const userData = {
    id: userId,
    fullName: identity.fullName ?? "Google User",
    role,
    accountStatus: ACCOUNT_STATUS.ACTIVE,
  };
  const oauthAccountData = {
    provider: identity.provider,
    providerAccountId: identity.providerUserId,
    email: identity.email,
  };
  const deviceData = buildDeviceData(device);

  const {
    family,
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
    refreshTokenHash,
  } = issueSessionTokens({ userId, role });

  const result = await createUserWithOAuthAndSession({
    userData,
    oauthAccountData,
    deviceData,
    refreshTokenData: {
      tokenHash: refreshTokenHash,
      family,
      expiresAt: refreshTokenExpiresAt,
    },
  });

  createUserRegisteredEvent({
    userId: result.user.id,
    phone: null,
    role,
    provider: AUTH_PROVIDERS.GOOGLE,
  });
  if (result.device) {
    createDeviceRegisteredEvent({
      userId: result.user.id,
      deviceId: result.device.deviceId,
      platform: result.device.platform,
    });
  }
  createGoogleLoginEvent({
    userId: result.user.id,
    email: identity.email,
    isNewUser: true,
    deviceId: device?.deviceId ?? null,
  });

  return toGoogleAuthResponse({
    user: result.user,
    accessToken: { token: accessToken, expiresAt: accessTokenExpiresAt },
    refreshToken: { token: refreshToken, expiresAt: refreshTokenExpiresAt },
    isNewUser: true,
  });
}

// Link Google Account (to an existing authenticated user)

export async function linkGoogleAccount({ userId, idToken }) {
  const identity = await verifyAndNormalizeGoogleIdentity(idToken);

  const existingOAuthAccount = await findOAuthAccountByProvider(
    AUTH_PROVIDERS.GOOGLE,
    identity.providerUserId,
  );
  if (existingOAuthAccount) {
    throw new GoogleAccountAlreadyLinkedError();
  }

  const userOAuthAccounts = await findOAuthAccountsByUserId(userId);
  const alreadyLinkedToGoogle = userOAuthAccounts.some(
    (acc) => acc.provider === AUTH_PROVIDERS.GOOGLE,
  );
  if (alreadyLinkedToGoogle) {
    throw new GoogleAccountAlreadyLinkedError(
      "This account already has a Google account linked",
    );
  }

  const oauthAccount = await createOAuthAccount({
    provider: identity.provider,
    providerAccountId: identity.providerUserId,
    email: identity.email,
    userId,
  });

  createGoogleAccountLinkedEvent({ userId, email: identity.email });

  return toOAuthAccountDTO(oauthAccount);
}

// Change Phone Number

export async function changePhoneNumber({
  userId,
  newPhone,
  otpVerificationToken,
}) {
  const verificationRecord =
    await findOtpVerificationTokenById(otpVerificationToken);
  assertVerificationTokenValid(verificationRecord, {
    phone: newPhone,
    purpose: "CHANGE_PHONE",
  });

  const existingUser = await findUserByPhone(newPhone);
  if (existingUser) {
    throw new PhoneAlreadyRegisteredError();
  }

  await updateUserPhone(userId, newPhone);
  const updatedUser = await markUserPhoneVerified(userId);
  await markOtpVerificationTokenConsumed(otpVerificationToken);

  createPhoneVerifiedEvent({ userId, phone: newPhone });

  return toUserProfile(updatedUser);
}

// User Profile

export async function getUserProfile({ userId }) {
  const user = await findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return toUserProfile(user);
}

// Session Management

export async function listSessions({ userId }) {
  const refreshTokens = await listActiveSessionsForUser(userId);
  const sessions = refreshTokens.map((rt) => ({
    refreshToken: rt,
    device: rt.device ?? null,
  }));
  return toSessionListDTO(sessions);
}

export async function revokeSession({ userId, refreshTokenId }) {
  const activeSessions = await listActiveSessionsForUser(userId);
  const target = activeSessions.find((rt) => rt.id === refreshTokenId);

  if (!target) {
    throw new NotFoundError("Session not found");
  }

  await revokeRefreshTokenById(target.id, "USER_REVOKED");

  createSessionRevokedEvent({
    userId,
    refreshTokenId: target.id,
    reason: "USER_REVOKED",
  });

  return { success: true };
}

// Shared access-token verification utility for any flow that needs to validate an access token and extract its claims.
export function verifyAccessTokenClaims({ accessToken }) {
  try {
    return verifyAccessTokenJwt(accessToken);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AccessTokenExpiredError();
    }
    throw new InvalidAccessTokenError();
  }
}
