import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { randomUUID } from "node:crypto";


jest.unstable_mockModule(
  "../../../modules/auth/auth.repository.js",
  () => ({
    createUserWithSession: jest.fn(),
    createUserWithOAuthAndSession: jest.fn(),
    findUserByPhone: jest.fn(),
    findUserById: jest.fn(),
    updateUserPhone: jest.fn(),
    markUserPhoneVerified: jest.fn(),
    updateUserLastLoginAt: jest.fn(),
    findLatestActiveOtpCode: jest.fn(),
    createOtpCode: jest.fn(),
    incrementOtpAttempts: jest.fn(),
    countOtpRequestsSince: jest.fn(),
    consumeOtpAndCreateVerificationToken: jest.fn(),
    findOtpVerificationTokenById: jest.fn(),
    markOtpVerificationTokenConsumed: jest.fn(),
    findOAuthAccountByProvider: jest.fn(),
    createOAuthAccount: jest.fn(),
    findOAuthAccountsByUserId: jest.fn(),
    upsertDevice: jest.fn(),
    createRefreshToken: jest.fn(),
    findRefreshTokenByHash: jest.fn(),
    findRefreshTokenWithRelationsByHash: jest.fn(),
    revokeRefreshTokenById: jest.fn(),
    revokeRefreshTokenFamily: jest.fn(),
    revokeAllRefreshTokensForUser: jest.fn(),
    rotateRefreshToken: jest.fn(),
    listActiveSessionsForUser: jest.fn(),
  }),
);

jest.unstable_mockModule("../../../common/utils/otp.js", () => ({
  generateOtpCode: jest.fn(),
  hashOtpCode: jest.fn(),
  verifyOtpCode: jest.fn(),
  isOtpExpired: jest.fn(),
  computeOtpExpiry: jest.fn(),
}));

jest.unstable_mockModule("../../../common/utils/crypto.js", () => ({
  sha256Hash: jest.fn(),
}));

jest.unstable_mockModule("../../../common/utils/jwt.js", () => ({
  signAccessToken: jest.fn(),
  signRefreshToken: jest.fn(),
  verifyAccessToken: jest.fn(),
  verifyRefreshToken: jest.fn(),
  computeAccessTokenExpiry: jest.fn(),
  computeRefreshTokenExpiry: jest.fn(),
}));

jest.unstable_mockModule("../../../common/utils/googleOAuth.js", () => ({
  verifyAndNormalizeGoogleIdentity: jest.fn(),
}));

jest.unstable_mockModule("../../../common/utils/smsProvider.js", () => ({
  sendOtp: jest.fn(),
  resolveSmsProvider: jest.fn(() => ({ send: jest.fn() })),
}));

jest.unstable_mockModule("../../../modules/auth/auth.events.js", () => ({
  createOtpRequestedEvent: jest.fn(() => ({ eventType: "otp.requested" })),
  createOtpVerifiedEvent: jest.fn(() => ({ eventType: "otp.verified" })),
  createUserRegisteredEvent: jest.fn(() => ({ eventType: "user.registered" })),
  createDeviceRegisteredEvent: jest.fn(() => ({
    eventType: "device.registered",
  })),
  createLoginSucceededEvent: jest.fn(() => ({ eventType: "login.succeeded" })),
  createLoginFailedEvent: jest.fn(() => ({ eventType: "login.failed" })),
  createLogoutEvent: jest.fn(() => ({ eventType: "logout" })),
  createRefreshTokenRotatedEvent: jest.fn(() => ({
    eventType: "refresh.rotated",
  })),
  createPhoneVerifiedEvent: jest.fn(() => ({ eventType: "phone.verified" })),
  createSessionRevokedEvent: jest.fn(() => ({ eventType: "session.revoked" })),
  createGoogleAccountLinkedEvent: jest.fn(() => ({
    eventType: "google.linked",
  })),
  createGoogleLoginEvent: jest.fn(() => ({ eventType: "google.login" })),
}));

// ─── Import mocks + service under test AFTER mocking ───

const repo = await import("../../../modules/auth/auth.repository.js");
const otpUtil = await import("../../../common/utils/otp.js");
const cryptoUtil = await import("../../../common/utils/crypto.js");
const jwtUtil = await import("../../../common/utils/jwt.js");
const googleOAuthUtil =
  await import("../../../common/utils/googleOAuth.js");
const smsProviderUtil =
  await import("../../../common/utils/smsProvider.js");
const events = await import("../../../modules/auth/auth.events.js");
const service = await import("../../../modules/auth/auth.service.js");
const authErrors = await import("../../../modules/auth/auth.errors.js");
const commonErrors = await import("../../../errors/commonErrors.js");
const { RATE_LIMIT_CONFIG, OTP_CONFIG, ACCOUNT_STATUS, USER_ROLES } =
  await import("../../../modules/auth/auth.constants.js");

// ─── Shared fixtures ───

function fakeUser(overrides = {}) {
  return {
    id: randomUUID(),
    fullName: "Kwame Mensah",
    role: USER_ROLES.FARMER,
    phone: "+233241234567",
    accountStatus: ACCOUNT_STATUS.ACTIVE,
    ...overrides,
  };
}

function fakeOtpCode(overrides = {}) {
  return {
    id: randomUUID(),
    phone: "+233241234567",
    purpose: "LOGIN",
    codeHash: "hashed",
    attempts: 0,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    createdAt: new Date(),
    ...overrides,
  };
}

function fakeVerificationToken(overrides = {}) {
  return {
    id: randomUUID(),
    phone: "+233241234567",
    purpose: "LOGIN",
    consumedAt: null,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    ...overrides,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  // sane defaults reused by most tests
  cryptoUtil.sha256Hash.mockReturnValue("hashed-token");
  jwtUtil.signAccessToken.mockReturnValue("access.jwt.token");
  jwtUtil.signRefreshToken.mockReturnValue("refresh.jwt.token");
  jwtUtil.computeAccessTokenExpiry.mockReturnValue(
    new Date(Date.now() + 15 * 60 * 1000),
  );
  jwtUtil.computeRefreshTokenExpiry.mockReturnValue(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  );
  otpUtil.isOtpExpired.mockReturnValue(false);
});

// ─────────────────────────────────────────────────────────────
describe("requestOtp", () => {
  test("throws PhoneAlreadyRegisteredError for REGISTRATION when the phone already has an account", async () => {
    repo.findUserByPhone.mockResolvedValue(fakeUser());

    await expect(
      service.requestOtp({ phone: "+233241234567", purpose: "REGISTRATION" }),
    ).rejects.toBeInstanceOf(authErrors.PhoneAlreadyRegisteredError);
    expect(repo.createOtpCode).not.toHaveBeenCalled();
  });

  test("throws RateLimitError when the hourly request cap is exceeded", async () => {
    repo.findUserByPhone.mockResolvedValue(null);
    repo.countOtpRequestsSince.mockResolvedValue(
      RATE_LIMIT_CONFIG.OTP_REQUEST_MAX,
    );

    await expect(
      service.requestOtp({ phone: "+233241234567", purpose: "LOGIN" }),
    ).rejects.toBeInstanceOf(commonErrors.RateLimitError);
  });

  test("throws OTPRequestCooldownError when a recent OTP is still within its cooldown window", async () => {
    repo.findUserByPhone.mockResolvedValue(null);
    repo.countOtpRequestsSince.mockResolvedValue(0);
    repo.findLatestActiveOtpCode.mockResolvedValue(
      fakeOtpCode({ createdAt: new Date() }),
    );

    await expect(
      service.requestOtp({ phone: "+233241234567", purpose: "LOGIN" }),
    ).rejects.toBeInstanceOf(authErrors.OTPRequestCooldownError);
  });

  test("on success: generates, hashes, persists the OTP, dispatches SMS, and emits an event", async () => {
    repo.findUserByPhone.mockResolvedValue(null);
    repo.countOtpRequestsSince.mockResolvedValue(0);
    repo.findLatestActiveOtpCode.mockResolvedValue(null);
    otpUtil.generateOtpCode.mockReturnValue("483921");
    otpUtil.hashOtpCode.mockReturnValue("hashed-483921");
    otpUtil.computeOtpExpiry.mockReturnValue(
      new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000),
    );
    repo.createOtpCode.mockResolvedValue(
      fakeOtpCode({ codeHash: "hashed-483921", createdAt: new Date() }),
    );

    const result = await service.requestOtp({
      phone: "+233241234567",
      purpose: "LOGIN",
      ipAddress: "127.0.0.1",
    });

    expect(repo.createOtpCode).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: "+233241234567",
        purpose: "LOGIN",
        codeHash: "hashed-483921",
      }),
    );
    expect(smsProviderUtil.sendOtp).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: "+233241234567",
        code: "483921",
        purpose: "LOGIN",
      }),
    );
    expect(events.createOtpRequestedEvent).toHaveBeenCalled();
    expect(result).toHaveProperty("phone", "+233241234567");
    expect(result).toHaveProperty("resendAvailableAt");
  });
});

// ─────────────────────────────────────────────────────────────
describe("verifyOtp", () => {
  test("throws InvalidOTPError when no active OTP exists", async () => {
    repo.findLatestActiveOtpCode.mockResolvedValue(null);

    await expect(
      service.verifyOtp({
        phone: "+233241234567",
        code: "123456",
        purpose: "LOGIN",
      }),
    ).rejects.toBeInstanceOf(authErrors.InvalidOTPError);
  });

  test("throws OTPMaxAttemptsExceededError once attempts reach the configured cap", async () => {
    repo.findLatestActiveOtpCode.mockResolvedValue(
      fakeOtpCode({ attempts: OTP_CONFIG.MAX_VERIFY_ATTEMPTS }),
    );

    await expect(
      service.verifyOtp({
        phone: "+233241234567",
        code: "123456",
        purpose: "LOGIN",
      }),
    ).rejects.toBeInstanceOf(authErrors.OTPMaxAttemptsExceededError);
  });

  test("throws OTPExpiredError for an expired code", async () => {
    repo.findLatestActiveOtpCode.mockResolvedValue(fakeOtpCode());
    otpUtil.isOtpExpired.mockReturnValue(true);

    await expect(
      service.verifyOtp({
        phone: "+233241234567",
        code: "123456",
        purpose: "LOGIN",
      }),
    ).rejects.toBeInstanceOf(authErrors.OTPExpiredError);
  });

  test("increments attempts and throws InvalidOTPError on a wrong code", async () => {
    repo.findLatestActiveOtpCode.mockResolvedValue(fakeOtpCode());
    otpUtil.verifyOtpCode.mockReturnValue(false);

    await expect(
      service.verifyOtp({
        phone: "+233241234567",
        code: "000000",
        purpose: "LOGIN",
      }),
    ).rejects.toBeInstanceOf(authErrors.InvalidOTPError);
    expect(repo.incrementOtpAttempts).toHaveBeenCalled();
  });

  test("on success: consumes the OTP, issues a verification token, and emits an event", async () => {
    const otp = fakeOtpCode();
    repo.findLatestActiveOtpCode.mockResolvedValue(otp);
    otpUtil.verifyOtpCode.mockReturnValue(true);
    repo.consumeOtpAndCreateVerificationToken.mockResolvedValue(
      fakeVerificationToken(),
    );

    const result = await service.verifyOtp({
      phone: "+233241234567",
      code: "123456",
      purpose: "LOGIN",
    });

    expect(repo.consumeOtpAndCreateVerificationToken).toHaveBeenCalledWith(
      expect.objectContaining({ otpCodeId: otp.id }),
    );
    expect(events.createOtpVerifiedEvent).toHaveBeenCalled();
    expect(result).toHaveProperty("verificationToken");
  });
});

// ─────────────────────────────────────────────────────────────
describe("registerWithPhone", () => {
  test("throws InvalidVerificationTokenError when the token does not exist", async () => {
    repo.findOtpVerificationTokenById.mockResolvedValue(null);

    await expect(
      service.registerWithPhone({
        phone: "+233241234567",
        fullName: "Kwame Mensah",
        role: "FARMER",
        otpVerificationToken: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(authErrors.InvalidVerificationTokenError);
  });

  test("throws VerificationTokenExpiredError for an expired token", async () => {
    repo.findOtpVerificationTokenById.mockResolvedValue(
      fakeVerificationToken({ purpose: "REGISTRATION" }),
    );
    otpUtil.isOtpExpired.mockReturnValue(true);

    await expect(
      service.registerWithPhone({
        phone: "+233241234567",
        fullName: "Kwame Mensah",
        role: "FARMER",
        otpVerificationToken: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(authErrors.VerificationTokenExpiredError);
  });

  test("throws PhoneAlreadyRegisteredError if the phone was registered after OTP verification", async () => {
    repo.findOtpVerificationTokenById.mockResolvedValue(
      fakeVerificationToken({ purpose: "REGISTRATION" }),
    );
    repo.findUserByPhone.mockResolvedValue(fakeUser());

    await expect(
      service.registerWithPhone({
        phone: "+233241234567",
        fullName: "Kwame Mensah",
        role: "FARMER",
        otpVerificationToken: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(authErrors.PhoneAlreadyRegisteredError);
  });

  test("on success: creates the user with ACTIVE status, consumes the token, and emits events", async () => {
    repo.findOtpVerificationTokenById.mockResolvedValue(
      fakeVerificationToken({ purpose: "REGISTRATION" }),
    );
    repo.findUserByPhone.mockResolvedValue(null);
    repo.createUserWithSession.mockResolvedValue({
      user: fakeUser(),
      device: null,
    });

    const result = await service.registerWithPhone({
      phone: "+233241234567",
      fullName: "Kwame Mensah",
      role: "FARMER",
      otpVerificationToken: randomUUID(),
    });

    expect(repo.createUserWithSession).toHaveBeenCalledWith(
      expect.objectContaining({
        userData: expect.objectContaining({
          accountStatus: ACCOUNT_STATUS.ACTIVE,
          phoneVerifiedAt: expect.any(Date),
        }),
      }),
    );
    expect(repo.markOtpVerificationTokenConsumed).toHaveBeenCalled();
    expect(events.createUserRegisteredEvent).toHaveBeenCalled();
    expect(result).toHaveProperty("isNewUser", true);
  });
});

// ─────────────────────────────────────────────────────────────
describe("loginWithPhone", () => {
  test("emits a failure event and throws NotFoundError when no account exists", async () => {
    repo.findOtpVerificationTokenById.mockResolvedValue(
      fakeVerificationToken(),
    );
    repo.findUserByPhone.mockResolvedValue(null);

    await expect(
      service.loginWithPhone({
        phone: "+233241234567",
        otpVerificationToken: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(commonErrors.NotFoundError);
    expect(events.createLoginFailedEvent).toHaveBeenCalled();
  });

  test("throws AccountSuspendedError for a suspended account", async () => {
    repo.findOtpVerificationTokenById.mockResolvedValue(
      fakeVerificationToken(),
    );
    repo.findUserByPhone.mockResolvedValue(
      fakeUser({ accountStatus: ACCOUNT_STATUS.SUSPENDED }),
    );

    await expect(
      service.loginWithPhone({
        phone: "+233241234567",
        otpVerificationToken: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(authErrors.AccountSuspendedError);
  });

  test("on success: issues tokens, updates last login, and emits a success event", async () => {
    const user = fakeUser();
    repo.findOtpVerificationTokenById.mockResolvedValue(
      fakeVerificationToken(),
    );
    repo.findUserByPhone.mockResolvedValue(user);
    repo.createRefreshToken.mockResolvedValue({});

    const result = await service.loginWithPhone({
      phone: "+233241234567",
      otpVerificationToken: randomUUID(),
    });

    expect(repo.updateUserLastLoginAt).toHaveBeenCalledWith(user.id);
    expect(events.createLoginSucceededEvent).toHaveBeenCalled();
    expect(result).toHaveProperty("isNewUser", false);
  });
});

// ─────────────────────────────────────────────────────────────
describe("refreshSession", () => {
  test("throws RefreshTokenExpiredError when the JWT itself is expired", async () => {
    jwtUtil.verifyRefreshToken.mockImplementation(() => {
      const err = new Error("expired");
      err.name = "TokenExpiredError";
      throw err;
    });

    await expect(
      service.refreshSession({ refreshToken: "a".repeat(30) }),
    ).rejects.toBeInstanceOf(authErrors.RefreshTokenExpiredError);
  });

  test("detects reuse: revokes the entire family and throws RefreshTokenReuseError", async () => {
    jwtUtil.verifyRefreshToken.mockReturnValue({ userId: "u1", family: "f1" });
    repo.findRefreshTokenWithRelationsByHash.mockResolvedValue({
      id: "rt1",
      family: "f1",
      userId: "u1",
      revokedAt: new Date(), // already revoked = reuse
      expiresAt: new Date(Date.now() + 1000 * 60),
      user: fakeUser({ id: "u1" }),
    });

    await expect(
      service.refreshSession({ refreshToken: "a".repeat(30) }),
    ).rejects.toBeInstanceOf(authErrors.RefreshTokenReuseError);
    expect(repo.revokeRefreshTokenFamily).toHaveBeenCalledWith(
      "f1",
      "REUSE_DETECTED",
    );
  });

  test("on success: rotates the token and emits an event", async () => {
    const user = fakeUser({ id: "u1" });
    jwtUtil.verifyRefreshToken.mockReturnValue({ userId: "u1", family: "f1" });
    repo.findRefreshTokenWithRelationsByHash.mockResolvedValue({
      id: "rt1",
      family: "f1",
      userId: "u1",
      deviceId: null,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 1000 * 60),
      user,
    });

    const result = await service.refreshSession({
      refreshToken: "a".repeat(30),
    });

    expect(repo.rotateRefreshToken).toHaveBeenCalled();
    expect(events.createRefreshTokenRotatedEvent).toHaveBeenCalled();
    expect(result).toHaveProperty("accessToken");
    expect(result).not.toHaveProperty("user"); // deliberately minimal response
  });
});

// ─────────────────────────────────────────────────────────────
describe("logout", () => {
  test("throws InvalidRefreshTokenError when the token is unknown", async () => {
    repo.findRefreshTokenByHash.mockResolvedValue(null);

    await expect(
      service.logout({ refreshToken: "a".repeat(30), allDevices: false }),
    ).rejects.toBeInstanceOf(authErrors.InvalidRefreshTokenError);
  });

  test("allDevices: true revokes every session for the user, not just one", async () => {
    repo.findRefreshTokenByHash.mockResolvedValue({
      id: "rt1",
      userId: "u1",
      deviceId: null,
    });

    await service.logout({ refreshToken: "a".repeat(30), allDevices: true });

    expect(repo.revokeAllRefreshTokensForUser).toHaveBeenCalledWith(
      "u1",
      "LOGOUT_ALL_DEVICES",
    );
    expect(repo.revokeRefreshTokenById).not.toHaveBeenCalled();
  });

  test("allDevices: false revokes only the presented token", async () => {
    repo.findRefreshTokenByHash.mockResolvedValue({
      id: "rt1",
      userId: "u1",
      deviceId: null,
    });

    await service.logout({ refreshToken: "a".repeat(30), allDevices: false });

    expect(repo.revokeRefreshTokenById).toHaveBeenCalledWith("rt1", "LOGOUT");
    expect(events.createLogoutEvent).toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("signInWithGoogle", () => {
  test("existing OAuth account: logs in without creating a new user", async () => {
    const user = fakeUser();
    googleOAuthUtil.verifyAndNormalizeGoogleIdentity.mockResolvedValue({
      provider: "GOOGLE",
      providerUserId: "google-sub-123",
      email: "ama@gmail.com",
    });
    repo.findOAuthAccountByProvider.mockResolvedValue({ userId: user.id });
    repo.findUserById.mockResolvedValue(user);

    const result = await service.signInWithGoogle({ idToken: "a".repeat(30) });

    expect(repo.createUserWithOAuthAndSession).not.toHaveBeenCalled();
    expect(events.createGoogleLoginEvent).toHaveBeenCalledWith(
      expect.objectContaining({ isNewUser: false }),
    );
    expect(result).toHaveProperty("isNewUser", false);
  });

  test("no existing account and no role supplied throws BadRequestError", async () => {
    googleOAuthUtil.verifyAndNormalizeGoogleIdentity.mockResolvedValue({
      provider: "GOOGLE",
      providerUserId: "google-sub-456",
      email: "new@gmail.com",
    });
    repo.findOAuthAccountByProvider.mockResolvedValue(null);

    await expect(
      service.signInWithGoogle({ idToken: "a".repeat(30) }),
    ).rejects.toBeInstanceOf(commonErrors.BadRequestError);
  });

  test("no existing account with role supplied creates a new user", async () => {
    googleOAuthUtil.verifyAndNormalizeGoogleIdentity.mockResolvedValue({
      provider: "GOOGLE",
      providerUserId: "google-sub-789",
      email: "new@gmail.com",
      fullName: "Ama Boateng",
    });
    repo.findOAuthAccountByProvider.mockResolvedValue(null);
    repo.createUserWithOAuthAndSession.mockResolvedValue({
      user: fakeUser(),
      device: null,
    });

    const result = await service.signInWithGoogle({
      idToken: "a".repeat(30),
      role: "BUYER",
    });

    expect(repo.createUserWithOAuthAndSession).toHaveBeenCalled();
    expect(events.createUserRegisteredEvent).toHaveBeenCalled();
    expect(result).toHaveProperty("isNewUser", true);
  });
});

// ─────────────────────────────────────────────────────────────
describe("linkGoogleAccount", () => {
  test("throws GoogleAccountAlreadyLinkedError if the Google identity belongs to another user", async () => {
    googleOAuthUtil.verifyAndNormalizeGoogleIdentity.mockResolvedValue({
      provider: "GOOGLE",
      providerUserId: "google-sub-999",
      email: "x@gmail.com",
    });
    repo.findOAuthAccountByProvider.mockResolvedValue({
      userId: "someone-else",
    });

    await expect(
      service.linkGoogleAccount({ userId: "u1", idToken: "a".repeat(30) }),
    ).rejects.toBeInstanceOf(authErrors.GoogleAccountAlreadyLinkedError);
  });

  test("throws GoogleAccountAlreadyLinkedError if the caller already has a Google account linked", async () => {
    googleOAuthUtil.verifyAndNormalizeGoogleIdentity.mockResolvedValue({
      provider: "GOOGLE",
      providerUserId: "google-sub-abc",
      email: "x@gmail.com",
    });
    repo.findOAuthAccountByProvider.mockResolvedValue(null);
    repo.findOAuthAccountsByUserId.mockResolvedValue([{ provider: "GOOGLE" }]);

    await expect(
      service.linkGoogleAccount({ userId: "u1", idToken: "a".repeat(30) }),
    ).rejects.toBeInstanceOf(authErrors.GoogleAccountAlreadyLinkedError);
  });

  test("on success: creates the OAuth account and emits an event", async () => {
    googleOAuthUtil.verifyAndNormalizeGoogleIdentity.mockResolvedValue({
      provider: "GOOGLE",
      providerUserId: "google-sub-def",
      email: "x@gmail.com",
    });
    repo.findOAuthAccountByProvider.mockResolvedValue(null);
    repo.findOAuthAccountsByUserId.mockResolvedValue([]);
    repo.createOAuthAccount.mockResolvedValue({
      id: "oa1",
      provider: "GOOGLE",
      email: "x@gmail.com",
      createdAt: new Date(),
    });

    const result = await service.linkGoogleAccount({
      userId: "u1",
      idToken: "a".repeat(30),
    });

    expect(events.createGoogleAccountLinkedEvent).toHaveBeenCalled();
    expect(result).toHaveProperty("provider", "GOOGLE");
  });
});

// ─────────────────────────────────────────────────────────────
describe("changePhoneNumber", () => {
  test("throws PhoneAlreadyRegisteredError if the new phone is already taken", async () => {
    repo.findOtpVerificationTokenById.mockResolvedValue(
      fakeVerificationToken({
        purpose: "CHANGE_PHONE",
        phone: "+233551234567",
      }),
    );
    repo.findUserByPhone.mockResolvedValue(fakeUser());

    await expect(
      service.changePhoneNumber({
        userId: "u1",
        newPhone: "+233551234567",
        otpVerificationToken: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(authErrors.PhoneAlreadyRegisteredError);
  });

  test("on success: updates phone, marks it verified, and emits an event", async () => {
    repo.findOtpVerificationTokenById.mockResolvedValue(
      fakeVerificationToken({
        purpose: "CHANGE_PHONE",
        phone: "+233551234567",
      }),
    );
    repo.findUserByPhone.mockResolvedValue(null);
    repo.markUserPhoneVerified.mockResolvedValue(
      fakeUser({ phone: "+233551234567" }),
    );

    const result = await service.changePhoneNumber({
      userId: "u1",
      newPhone: "+233551234567",
      otpVerificationToken: randomUUID(),
    });

    expect(repo.updateUserPhone).toHaveBeenCalledWith("u1", "+233551234567");
    expect(events.createPhoneVerifiedEvent).toHaveBeenCalled();
    expect(result).toHaveProperty("phone", "+233551234567");
  });
});

// ─────────────────────────────────────────────────────────────
describe("getUserProfile", () => {
  test("throws NotFoundError when the user does not exist", async () => {
    repo.findUserById.mockResolvedValue(null);
    await expect(
      service.getUserProfile({ userId: "nope" }),
    ).rejects.toBeInstanceOf(commonErrors.NotFoundError);
  });

  test("returns a mapped profile on success", async () => {
    repo.findUserById.mockResolvedValue(fakeUser());
    const result = await service.getUserProfile({ userId: "u1" });
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("accountStatus");
  });
});

// ─────────────────────────────────────────────────────────────
describe("listSessions", () => {
  test("maps active refresh tokens into session DTOs", async () => {
    repo.listActiveSessionsForUser.mockResolvedValue([
      {
        id: "rt1",
        issuedAt: new Date(),
        expiresAt: new Date(),
        revokedAt: null,
        device: null,
      },
    ]);

    const result = await service.listSessions({ userId: "u1" });
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("isRevoked", false);
  });
});

// ─────────────────────────────────────────────────────────────
describe("revokeSession", () => {
  test("throws NotFoundError if the session does not belong to the caller", async () => {
    repo.listActiveSessionsForUser.mockResolvedValue([{ id: "other-session" }]);

    await expect(
      service.revokeSession({ userId: "u1", refreshTokenId: "rt-mine" }),
    ).rejects.toBeInstanceOf(commonErrors.NotFoundError);
  });

  test("on success: revokes the session and emits an event", async () => {
    repo.listActiveSessionsForUser.mockResolvedValue([{ id: "rt-mine" }]);

    await service.revokeSession({ userId: "u1", refreshTokenId: "rt-mine" });

    expect(repo.revokeRefreshTokenById).toHaveBeenCalledWith(
      "rt-mine",
      "USER_REVOKED",
    );
    expect(events.createSessionRevokedEvent).toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("verifyAccessTokenClaims", () => {
  test("throws AccessTokenExpiredError for an expired token", () => {
    jwtUtil.verifyAccessToken.mockImplementation(() => {
      const err = new Error("expired");
      err.name = "TokenExpiredError";
      throw err;
    });

    expect(() =>
      service.verifyAccessTokenClaims({ accessToken: "a".repeat(30) }),
    ).toThrow(authErrors.AccessTokenExpiredError);
  });

  test("throws InvalidAccessTokenError for a malformed/invalid token", () => {
    jwtUtil.verifyAccessToken.mockImplementation(() => {
      throw new Error("bad signature");
    });

    expect(() =>
      service.verifyAccessTokenClaims({ accessToken: "a".repeat(30) }),
    ).toThrow(authErrors.InvalidAccessTokenError);
  });

  test("returns claims on success", () => {
    jwtUtil.verifyAccessToken.mockReturnValue({ userId: "u1", role: "FARMER" });
    const result = service.verifyAccessTokenClaims({
      accessToken: "a".repeat(30),
    });
    expect(result).toEqual({ userId: "u1", role: "FARMER" });
  });
});
