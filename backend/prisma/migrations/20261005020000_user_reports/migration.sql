CREATE TYPE "UserReportStatus" AS ENUM ('OPEN', 'UNDER_REVIEW', 'DISMISSED', 'CONFIRMED');
CREATE TYPE "UserReportReason" AS ENUM ('FRAUD', 'HARASSMENT', 'IMPERSONATION', 'UNSAFE_BEHAVIOR', 'OTHER');

CREATE TABLE "user_reports" (
  "id" UUID NOT NULL,
  "reporterId" UUID NOT NULL,
  "reportedUserId" UUID NOT NULL,
  "resolvedById" UUID,
  "reason" "UserReportReason" NOT NULL,
  "description" VARCHAR(1000) NOT NULL,
  "evidenceUrls" TEXT[] NOT NULL,
  "status" "UserReportStatus" NOT NULL DEFAULT 'OPEN',
  "resolutionNotes" VARCHAR(1000),
  "resolvedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "user_reports_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "user_reports_status_createdAt_idx" ON "user_reports"("status", "createdAt");
CREATE INDEX "user_reports_reportedUserId_status_idx" ON "user_reports"("reportedUserId", "status");
CREATE INDEX "user_reports_reporterId_idx" ON "user_reports"("reporterId");
ALTER TABLE "user_reports" ADD CONSTRAINT "user_reports_reporterId_fkey"
  FOREIGN KEY ("reporterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "user_reports" ADD CONSTRAINT "user_reports_reportedUserId_fkey"
  FOREIGN KEY ("reportedUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "user_reports" ADD CONSTRAINT "user_reports_resolvedById_fkey"
  FOREIGN KEY ("resolvedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
