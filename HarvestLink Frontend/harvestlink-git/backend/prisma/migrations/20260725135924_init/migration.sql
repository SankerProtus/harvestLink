-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('FARMER', 'BUYER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "OtpPurpose" AS ENUM ('REGISTRATION', 'LOGIN', 'CHANGE_PHONE');

-- CreateEnum
CREATE TYPE "DevicePlatform" AS ENUM ('ANDROID', 'IOS', 'WEB');

-- CreateEnum
CREATE TYPE "OAuthProvider" AS ENUM ('GOOGLE');

-- CreateEnum
CREATE TYPE "CropType" AS ENUM ('TOMATO', 'MAIZE', 'CASSAVA', 'PLANTAIN', 'YAM', 'PEPPER', 'ONION', 'RICE', 'GROUNDNUT', 'COCOA');

-- CreateEnum
CREATE TYPE "QuantityUnit" AS ENUM ('KILOGRAM', 'BAG', 'CRATE', 'SACK', 'BUNCH', 'PIECE', 'BASKET');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('ACTIVE', 'SOLD', 'REMOVED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "fullName" VARCHAR(120) NOT NULL,
    "role" "UserRole" NOT NULL,
    "phone" VARCHAR(20),
    "phoneVerifiedAt" TIMESTAMP(3),
    "accountStatus" "AccountStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauth_accounts" (
    "id" UUID NOT NULL,
    "provider" "OAuthProvider" NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oauth_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" UUID NOT NULL,
    "deviceId" VARCHAR(255) NOT NULL,
    "deviceName" VARCHAR(255),
    "platform" "DevicePlatform" NOT NULL,
    "pushToken" VARCHAR(500),
    "lastSeenAt" TIMESTAMP(3),
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL,
    "tokenHash" VARCHAR(255) NOT NULL,
    "family" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "deviceId" UUID,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "revokedReason" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_codes" (
    "id" UUID NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "purpose" "OtpPurpose" NOT NULL,
    "codeHash" VARCHAR(255) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "requestIp" VARCHAR(45),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_verification_tokens" (
    "id" UUID NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "purpose" "OtpPurpose" NOT NULL,
    "otpCodeId" UUID NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listings" (
    "id" UUID NOT NULL,
    "farmerId" UUID NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "description" VARCHAR(1000),
    "cropType" "CropType" NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "quantityUnit" "QuantityUnit" NOT NULL,
    "pricePerUnit" DECIMAL(10,2) NOT NULL,
    "location" VARCHAR(120) NOT NULL,
    "images" TEXT[],
    "status" "ListingStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "listingId" UUID NOT NULL,
    "buyerId" UUID NOT NULL,
    "farmerId" UUID NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "pricePerUnitAtOrder" DECIMAL(10,2) NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "latestLatitude" DOUBLE PRECISION,
    "latestLongitude" DOUBLE PRECISION,
    "locationReportedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_accountStatus_idx" ON "users"("accountStatus");

-- CreateIndex
CREATE INDEX "oauth_accounts_userId_idx" ON "oauth_accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_accounts_provider_providerAccountId_key" ON "oauth_accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "devices_userId_idx" ON "devices"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "devices_userId_deviceId_key" ON "devices"("userId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_tokenHash_key" ON "refresh_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");

-- CreateIndex
CREATE INDEX "refresh_tokens_family_idx" ON "refresh_tokens"("family");

-- CreateIndex
CREATE INDEX "refresh_tokens_expiresAt_idx" ON "refresh_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "otp_codes_phone_purpose_idx" ON "otp_codes"("phone", "purpose");

-- CreateIndex
CREATE INDEX "otp_codes_expiresAt_idx" ON "otp_codes"("expiresAt");

-- CreateIndex
CREATE INDEX "otp_verification_tokens_phone_purpose_idx" ON "otp_verification_tokens"("phone", "purpose");

-- CreateIndex
CREATE INDEX "otp_verification_tokens_expiresAt_idx" ON "otp_verification_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "listings_farmerId_idx" ON "listings"("farmerId");

-- CreateIndex
CREATE INDEX "listings_cropType_idx" ON "listings"("cropType");

-- CreateIndex
CREATE INDEX "listings_status_idx" ON "listings"("status");

-- CreateIndex
CREATE INDEX "listings_location_idx" ON "listings"("location");

-- CreateIndex
CREATE INDEX "orders_buyerId_idx" ON "orders"("buyerId");

-- CreateIndex
CREATE INDEX "orders_farmerId_idx" ON "orders"("farmerId");

-- CreateIndex
CREATE INDEX "orders_listingId_idx" ON "orders"("listingId");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- AddForeignKey
ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "otp_verification_tokens" ADD CONSTRAINT "otp_verification_tokens_otpCodeId_fkey" FOREIGN KEY ("otpCodeId") REFERENCES "otp_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
