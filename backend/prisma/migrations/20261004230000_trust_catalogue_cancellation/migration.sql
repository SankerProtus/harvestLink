-- CreateEnum
CREATE TYPE "CropCategory" AS ENUM ('GRAIN', 'TUBER', 'VEGETABLE', 'FRUIT', 'LEGUME', 'CASH_CROP', 'OTHER');

-- CreateEnum
CREATE TYPE "VerificationProvider" AS ENUM ('MANUAL', 'SMILE_ID', 'DOJAH', 'OTHER');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN "verificationLevel" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "verification_records" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "provider" "VerificationProvider" NOT NULL,
    "providerReference" VARCHAR(255),
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "tierRequested" INTEGER NOT NULL,
    "notes" VARCHAR(500),
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops" (
    "id" UUID NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "category" "CropCategory" NOT NULL,
    "localNames" JSONB,
    "defaultUnit" "QuantityUnit" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market_prices" (
    "id" UUID NOT NULL,
    "cropId" UUID NOT NULL,
    "region" VARCHAR(120) NOT NULL,
    "quantityUnit" "QuantityUnit" NOT NULL,
    "referenceMinGhs" DECIMAL(10,2) NOT NULL,
    "referenceMaxGhs" DECIMAL(10,2) NOT NULL,
    "estimatedKgPerUnit" DECIMAL(10,2),
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "market_prices_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "listings" ADD COLUMN "cropId" UUID,
ADD COLUMN "customCropName" VARCHAR(80),
ADD COLUMN "priceReviewRequired" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN "confirmedAt" TIMESTAMP(3);

-- Seed crops (legacy enum slugs preserved for API compatibility)
INSERT INTO "crops" ("id", "name", "slug", "category", "localNames", "defaultUnit", "active", "updatedAt") VALUES
(gen_random_uuid(), 'Tomato', 'TOMATO', 'VEGETABLE', '{"tw":"Ntomato"}', 'CRATE', true, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Maize', 'MAIZE', 'GRAIN', '{"tw":"Aburo"}', 'BAG', true, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Cassava', 'CASSAVA', 'TUBER', '{"tw":"Bankye"}', 'SACK', true, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Plantain', 'PLANTAIN', 'FRUIT', '{"tw":"Kofi"}', 'BUNCH', true, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Yam', 'YAM', 'TUBER', '{"tw":"Bayere"}', 'BAG', true, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Pepper', 'PEPPER', 'VEGETABLE', '{"tw":"Akweley"}', 'BASKET', true, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Onion', 'ONION', 'VEGETABLE', '{"tw":"Gyeene"}', 'BAG', true, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Rice', 'RICE', 'GRAIN', '{"tw":"Emo"}', 'BAG', true, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Groundnut', 'GROUNDNUT', 'LEGUME', '{"tw":"Nkate"}', 'BAG', true, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Cocoa', 'COCOA', 'CASH_CROP', '{"tw":"Kookoo"}', 'BAG', true, CURRENT_TIMESTAMP);

UPDATE "listings" l
SET "cropId" = c."id"
FROM "crops" c
WHERE c."slug" = l."cropType"::text;

ALTER TABLE "listings" ALTER COLUMN "cropId" SET NOT NULL;

-- DropIndex
DROP INDEX "listings_cropType_idx";

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "cropType";

-- DropEnum
DROP TYPE "CropType";

-- CreateIndex
CREATE UNIQUE INDEX "crops_slug_key" ON "crops"("slug");
CREATE INDEX "crops_active_idx" ON "crops"("active");
CREATE INDEX "crops_category_idx" ON "crops"("category");
CREATE INDEX "listings_cropId_idx" ON "listings"("cropId");
CREATE UNIQUE INDEX "market_prices_cropId_region_quantityUnit_key" ON "market_prices"("cropId", "region", "quantityUnit");
CREATE INDEX "market_prices_cropId_idx" ON "market_prices"("cropId");
CREATE INDEX "users_verificationLevel_idx" ON "users"("verificationLevel");
CREATE INDEX "verification_records_userId_idx" ON "verification_records"("userId");
CREATE INDEX "verification_records_status_idx" ON "verification_records"("status");

-- AddForeignKey
ALTER TABLE "verification_records" ADD CONSTRAINT "verification_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "verification_records" ADD CONSTRAINT "verification_records_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "listings" ADD CONSTRAINT "listings_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_prices" ADD CONSTRAINT "market_prices_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
