-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ORDER_PLACED', 'ORDER_CONFIRMED', 'ORDER_IN_TRANSIT', 'ORDER_DELIVERED', 'ORDER_CANCELLED', 'LISTING_INTEREST', 'NEW_REVIEW');

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "body" VARCHAR(300) NOT NULL,
    "orderId" UUID,
    "listingId" UUID,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notifications_userId_isRead_idx" ON "notifications"("userId", "isRead");

-- CreateIndex
CREATE INDEX "notifications_userId_createdAt_idx" ON "notifications"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
