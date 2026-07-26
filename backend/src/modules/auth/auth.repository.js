import { prisma } from "../../common/utils/prismaClient.js";

// Users

export async function createUser(data) {
  return prisma.user.create({ data });
}

export async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

export async function findUserByPhone(phone) {
  return prisma.user.findUnique({ where: { phone } });
}

// Loads a user together with linked OAuth accounts
export async function findUserWithOAuthAccounts(id) {
  return prisma.user.findUnique({
    where: { id },
    include: { oauthAccounts: true },
  });
}

export async function updateUserPhone(id, phone) {
  return prisma.user.update({
    where: { id },
    data: { phone, phoneVerifiedAt: null },
  });
}

export async function markUserPhoneVerified(id) {
  return prisma.user.update({
    where: { id },
    data: { phoneVerifiedAt: new Date() },
  });
}

export async function updateUserAccountStatus(id, accountStatus) {
  return prisma.user.update({
    where: { id },
    data: { accountStatus },
  });
}

export async function updateUserLastLoginAt(id, lastLoginAt = new Date()) {
  return prisma.user.update({
    where: { id },
    data: { lastLoginAt },
  });
}

export async function softDeleteUser(id) {
  return prisma.user.update({
    where: { id },
    data: { accountStatus: "DELETED", deletedAt: new Date() },
  });
}

// OAuth Accounts

export async function findOAuthAccountByProvider(provider, providerAccountId) {
  return prisma.oAuthAccount.findUnique({
    where: { provider_providerAccountId: { provider, providerAccountId } },
  });
}

export async function createOAuthAccount(data) {
  return prisma.oAuthAccount.create({ data });
}

export async function findOAuthAccountsByUserId(userId) {
  return prisma.oAuthAccount.findMany({ where: { userId } });
}

// Devices

export async function findDeviceByUserAndDeviceId(userId, deviceId) {
  return prisma.device.findUnique({
    where: { userId_deviceId: { userId, deviceId } },
  });
}

export async function upsertDevice({
  userId,
  deviceId,
  deviceName,
  platform,
  pushToken,
}) {
  return prisma.device.upsert({
    where: { userId_deviceId: { userId, deviceId } },
    create: {
      userId,
      deviceId,
      deviceName,
      platform,
      pushToken,
      lastSeenAt: new Date(),
    },
    update: { deviceName, platform, pushToken, lastSeenAt: new Date() },
  });
}

export async function listDevicesByUserId(userId) {
  return prisma.device.findMany({
    where: { userId },
    orderBy: { lastSeenAt: "desc" },
  });
}

export async function updateDeviceLastSeen(id, lastSeenAt = new Date()) {
  return prisma.device.update({
    where: { id },
    data: { lastSeenAt },
  });
}

// Refresh Tokens

export async function createRefreshToken(data) {
  return prisma.refreshToken.create({ data });
}

export async function findRefreshTokenByHash(tokenHash) {
  return prisma.refreshToken.findUnique({ where: { tokenHash } });
}

export async function findRefreshTokenWithRelationsByHash(tokenHash) {
  return prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: { user: true, device: true },
  });
}

export async function findActiveRefreshTokensByFamily(family) {
  return prisma.refreshToken.findMany({
    where: { family, revokedAt: null, expiresAt: { gt: new Date() } },
  });
}

export async function revokeRefreshTokenById(id, revokedReason) {
  return prisma.refreshToken.update({
    where: { id },
    data: { revokedAt: new Date(), revokedReason },
  });
}

export async function revokeRefreshTokenFamily(family, revokedReason) {
  return prisma.refreshToken.updateMany({
    where: { family, revokedAt: null },
    data: { revokedAt: new Date(), revokedReason },
  });
}

export async function revokeAllRefreshTokensForUser(userId, revokedReason) {
  return prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date(), revokedReason },
  });
}

export async function rotateRefreshToken({
  oldTokenId,
  revokedReason,
  newTokenData,
}) {
  return prisma.$transaction(async (tx) => {
    await tx.refreshToken.update({
      where: { id: oldTokenId },
      data: { revokedAt: new Date(), revokedReason },
    });
    return tx.refreshToken.create({ data: newTokenData });
  });
}

export async function listActiveSessionsForUser(userId) {
  return prisma.refreshToken.findMany({
    where: { userId, revokedAt: null, expiresAt: { gt: new Date() } },
    include: { device: true },
    orderBy: { issuedAt: "desc" },
  });
}

// OTP Codes

export async function createOtpCode(data) {
  return prisma.otpCode.create({ data });
}

export async function findLatestActiveOtpCode(phone, purpose) {
  return prisma.otpCode.findFirst({
    where: { phone, purpose, consumedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });
}

export async function incrementOtpAttempts(id) {
  return prisma.otpCode.update({
    where: { id },
    data: { attempts: { increment: 1 } },
  });
}

export async function markOtpCodeConsumed(id) {
  return prisma.otpCode.update({
    where: { id },
    data: { consumedAt: new Date() },
  });
}

export async function countOtpRequestsSince(phone, purpose, since) {
  return prisma.otpCode.count({
    where: { phone, purpose, createdAt: { gte: since } },
  });
}

// OTP Verification Tokens

export async function createOtpVerificationToken(data) {
  return prisma.otpVerificationToken.create({ data });
}

export async function findOtpVerificationTokenById(id) {
  return prisma.otpVerificationToken.findUnique({ where: { id } });
}

export async function markOtpVerificationTokenConsumed(id) {
  return prisma.otpVerificationToken.update({
    where: { id },
    data: { consumedAt: new Date() },
  });
}

export async function consumeOtpAndCreateVerificationToken({
  otpCodeId,
  verificationTokenData,
}) {
  return prisma.$transaction(async (tx) => {
    await tx.otpCode.update({
      where: { id: otpCodeId },
      data: { consumedAt: new Date() },
    });
    return tx.otpVerificationToken.create({ data: verificationTokenData });
  });
}

// Composite: Registration

export async function createUserWithSession({
  userData,
  deviceData,
  refreshTokenData,
}) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({ data: userData });

    let device = null;
    if (deviceData) {
      device = await tx.device.create({
        data: { ...deviceData, userId: user.id },
      });
    }

    const refreshToken = await tx.refreshToken.create({
      data: {
        ...refreshTokenData,
        userId: user.id,
        deviceId: device ? device.id : null,
      },
    });

    return { user, device, refreshToken };
  });
}

// Composite: Google OAuth Registration

export async function createUserWithOAuthAndSession({
  userData,
  oauthAccountData,
  deviceData,
  refreshTokenData,
}) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({ data: userData });

    const oauthAccount = await tx.oAuthAccount.create({
      data: { ...oauthAccountData, userId: user.id },
    });

    let device = null;
    if (deviceData) {
      device = await tx.device.create({
        data: { ...deviceData, userId: user.id },
      });
    }

    const refreshToken = await tx.refreshToken.create({
      data: {
        ...refreshTokenData,
        userId: user.id,
        deviceId: device ? device.id : null,
      },
    });

    return { user, oauthAccount, device, refreshToken };
  });
}
