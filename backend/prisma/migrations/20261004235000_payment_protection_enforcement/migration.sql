-- Enforce protected delivery settlement without removing existing payment states.
ALTER TYPE "OrderStatus" ADD VALUE IF NOT EXISTS 'DISPUTED';
ALTER TYPE "PaymentStatus" ADD VALUE IF NOT EXISTS 'HELD';
ALTER TYPE "PaymentStatus" ADD VALUE IF NOT EXISTS 'RELEASE_PENDING';
ALTER TYPE "PaymentStatus" ADD VALUE IF NOT EXISTS 'RELEASED';
ALTER TYPE "PaymentStatus" ADD VALUE IF NOT EXISTS 'REFUND_PENDING';

ALTER TABLE "orders"
  ADD COLUMN IF NOT EXISTS "deliveryVerifiedAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "protectionEndsAt" TIMESTAMP(3);
ALTER TABLE "disputes"
  ADD COLUMN IF NOT EXISTS "evidenceExpiresAt" TIMESTAMP(3);
CREATE UNIQUE INDEX IF NOT EXISTS "refunds_paymentId_key" ON "refunds"("paymentId");

CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED');

CREATE TABLE "payouts" (
  "id" UUID NOT NULL,
  "orderId" UUID NOT NULL,
  "paymentId" UUID NOT NULL,
  "farmerId" UUID NOT NULL,
  "provider" "PaymentProvider" NOT NULL,
  "providerPayoutId" VARCHAR(255),
  "amount" DECIMAL(18,2) NOT NULL,
  "currency" CHAR(3) NOT NULL,
  "status" "PayoutStatus" NOT NULL DEFAULT 'PENDING',
  "failureReason" VARCHAR(500),
  "processedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "payouts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "payouts_orderId_key" ON "payouts"("orderId");
CREATE UNIQUE INDEX "payouts_provider_providerPayoutId_key" ON "payouts"("provider","providerPayoutId");
CREATE INDEX "payouts_farmerId_status_idx" ON "payouts"("farmerId","status");

ALTER TABLE "payouts"
  ADD CONSTRAINT "payouts_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payouts"
  ADD CONSTRAINT "payouts_paymentId_fkey"
  FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payouts"
  ADD CONSTRAINT "payouts_farmerId_fkey"
  FOREIGN KEY ("farmerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
