ALTER TABLE "payments"
ADD COLUMN "expiresAt" TIMESTAMP(3);

UPDATE "payments"
SET "expiresAt" = "createdAt" + INTERVAL '30 minutes'
WHERE "expiresAt" IS NULL
  AND "status" IN ('INITIATED', 'PENDING');
