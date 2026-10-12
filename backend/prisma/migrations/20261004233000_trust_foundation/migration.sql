-- Provider-agnostic trust, audit, idempotency, outbox, and payment foundation.

CREATE TYPE "CancellationRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "DisputeStatus" AS ENUM ('OPEN', 'UNDER_REVIEW', 'RESOLVED');
CREATE TYPE "DisputeReason" AS ENUM ('NON_DELIVERY', 'DAMAGED_GOODS', 'WRONG_QUANTITY', 'OTHER');
CREATE TYPE "ReliabilityMetricType" AS ENUM ('CANCELLATION_RATE', 'ON_TIME_DELIVERY_RATE');
CREATE TYPE "IdempotencyStatus" AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED');
CREATE TYPE "OutboxEventStatus" AS ENUM ('PENDING', 'PROCESSING', 'PUBLISHED', 'FAILED');
CREATE TYPE "PaymentProvider" AS ENUM ('STRIPE', 'PAYSTACK', 'FLUTTERWAVE', 'MOBILE_MONEY', 'BANK_TRANSFER', 'OTHER');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'CANCELLED', 'REFUNDED');
CREATE TYPE "EscrowStatus" AS ENUM ('PENDING', 'FUNDED', 'RELEASED', 'FROZEN', 'REFUNDED', 'FAILED');
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED');

ALTER TYPE "OrderStatus" ADD VALUE IF NOT EXISTS 'CANCELLATION_REQUESTED';

CREATE TABLE "delivery_handover_codes" (
  "id" UUID NOT NULL,
  "orderId" UUID NOT NULL,
  "codeHash" VARCHAR(128) NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "delivery_handover_codes_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "delivery_handover_codes_orderId_key" ON "delivery_handover_codes"("orderId");
CREATE INDEX "delivery_handover_codes_expiresAt_idx" ON "delivery_handover_codes"("expiresAt");

CREATE TABLE "cancellation_requests" (
  "id" UUID NOT NULL,
  "orderId" UUID NOT NULL,
  "requesterId" UUID NOT NULL,
  "decisionById" UUID,
  "reason" VARCHAR(500),
  "status" "CancellationRequestStatus" NOT NULL DEFAULT 'PENDING',
  "decidedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "cancellation_requests_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "cancellation_requests_orderId_status_idx" ON "cancellation_requests"("orderId", "status");
CREATE INDEX "cancellation_requests_requesterId_idx" ON "cancellation_requests"("requesterId");

CREATE TABLE "disputes" (
  "id" UUID NOT NULL,
  "orderId" UUID NOT NULL,
  "openedById" UUID NOT NULL,
  "resolvedById" UUID,
  "reason" "DisputeReason" NOT NULL,
  "description" VARCHAR(1000) NOT NULL,
  "evidenceUrls" TEXT[] NOT NULL,
  "status" "DisputeStatus" NOT NULL DEFAULT 'OPEN',
  "resolution" VARCHAR(1000),
  "resolvedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "disputes_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "disputes_orderId_status_idx" ON "disputes"("orderId", "status");
CREATE INDEX "disputes_openedById_idx" ON "disputes"("openedById");

CREATE TABLE "reliability_metrics" (
  "id" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "metricType" "ReliabilityMetricType" NOT NULL,
  "periodStart" DATE NOT NULL,
  "periodEnd" DATE NOT NULL,
  "value" DECIMAL(8,4) NOT NULL,
  "sampleSize" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "reliability_metrics_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "reliability_metrics_userId_metricType_periodStart_key" ON "reliability_metrics"("userId","metricType","periodStart");
CREATE INDEX "reliability_metrics_userId_metricType_idx" ON "reliability_metrics"("userId","metricType");

CREATE TABLE "audit_logs" (
  "id" UUID NOT NULL,
  "actorId" UUID,
  "action" VARCHAR(100) NOT NULL,
  "entityType" VARCHAR(100) NOT NULL,
  "entityId" VARCHAR(255) NOT NULL,
  "metadata" JSONB,
  "ipAddress" VARCHAR(45),
  "userAgent" VARCHAR(500),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "audit_logs_entityType_entityId_idx" ON "audit_logs"("entityType","entityId");
CREATE INDEX "audit_logs_actorId_createdAt_idx" ON "audit_logs"("actorId","createdAt");

CREATE TABLE "idempotency_keys" (
  "id" UUID NOT NULL,
  "key" VARCHAR(255) NOT NULL,
  "scope" VARCHAR(100) NOT NULL,
  "userId" UUID,
  "requestHash" VARCHAR(255) NOT NULL,
  "status" "IdempotencyStatus" NOT NULL DEFAULT 'PROCESSING',
  "responseCode" INTEGER,
  "responseBody" JSONB,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "completedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "idempotency_keys_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "idempotency_keys_scope_key_key" ON "idempotency_keys"("scope","key");
CREATE INDEX "idempotency_keys_expiresAt_idx" ON "idempotency_keys"("expiresAt");

CREATE TABLE "outbox_events" (
  "id" UUID NOT NULL,
  "aggregateType" VARCHAR(100) NOT NULL,
  "aggregateId" VARCHAR(100) NOT NULL,
  "eventType" VARCHAR(150) NOT NULL,
  "payload" JSONB NOT NULL,
  "status" "OutboxEventStatus" NOT NULL DEFAULT 'PENDING',
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "availableAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "processedAt" TIMESTAMP(3),
  "lastError" VARCHAR(2000),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "outbox_events_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "outbox_events_status_availableAt_idx" ON "outbox_events"("status","availableAt");

ALTER TABLE "delivery_handover_codes" ADD CONSTRAINT "delivery_handover_codes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "cancellation_requests" ADD CONSTRAINT "cancellation_requests_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "cancellation_requests" ADD CONSTRAINT "cancellation_requests_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cancellation_requests" ADD CONSTRAINT "cancellation_requests_decisionById_fkey" FOREIGN KEY ("decisionById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_openedById_fkey" FOREIGN KEY ("openedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_resolvedById_fkey" FOREIGN KEY ("resolvedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "reliability_metrics" ADD CONSTRAINT "reliability_metrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "idempotency_keys" ADD CONSTRAINT "idempotency_keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "payments" (
  "id" UUID NOT NULL,
  "orderId" UUID NOT NULL,
  "buyerId" UUID NOT NULL,
  "provider" "PaymentProvider" NOT NULL,
  "providerPaymentId" VARCHAR(255),
  "amount" DECIMAL(18,2) NOT NULL,
  "currency" CHAR(3) NOT NULL,
  "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
  "metadata" JSONB,
  "authorizedAt" TIMESTAMP(3),
  "capturedAt" TIMESTAMP(3),
  "failedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "payments_provider_providerPaymentId_key" ON "payments"("provider","providerPaymentId");
CREATE INDEX "payments_orderId_status_idx" ON "payments"("orderId","status");
CREATE INDEX "payments_buyerId_idx" ON "payments"("buyerId");

CREATE TABLE "escrows" (
  "id" UUID NOT NULL,
  "orderId" UUID NOT NULL,
  "paymentId" UUID NOT NULL,
  "provider" "PaymentProvider" NOT NULL,
  "providerEscrowId" VARCHAR(255),
  "amount" DECIMAL(18,2) NOT NULL,
  "currency" CHAR(3) NOT NULL,
  "status" "EscrowStatus" NOT NULL DEFAULT 'PENDING',
  "fundedAt" TIMESTAMP(3),
  "releasedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "escrows_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "escrows_orderId_key" ON "escrows"("orderId");
CREATE UNIQUE INDEX "escrows_paymentId_key" ON "escrows"("paymentId");
CREATE UNIQUE INDEX "escrows_provider_providerEscrowId_key" ON "escrows"("provider","providerEscrowId");

CREATE TABLE "refunds" (
  "id" UUID NOT NULL,
  "orderId" UUID NOT NULL,
  "paymentId" UUID NOT NULL,
  "provider" "PaymentProvider" NOT NULL,
  "providerRefundId" VARCHAR(255),
  "amount" DECIMAL(18,2) NOT NULL,
  "currency" CHAR(3) NOT NULL,
  "status" "RefundStatus" NOT NULL DEFAULT 'PENDING',
  "reason" VARCHAR(500),
  "processedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "refunds_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "refunds_provider_providerRefundId_key" ON "refunds"("provider","providerRefundId");
CREATE INDEX "refunds_orderId_status_idx" ON "refunds"("orderId","status");
CREATE INDEX "refunds_paymentId_idx" ON "refunds"("paymentId");

ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "payments_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "escrows" ADD CONSTRAINT "escrows_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "escrows" ADD CONSTRAINT "escrows_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
