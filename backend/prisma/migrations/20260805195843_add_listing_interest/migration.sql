-- CreateTable
CREATE TABLE "listing_interests" (
    "id" UUID NOT NULL,
    "listingId" UUID NOT NULL,
    "buyerId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listing_interests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "listing_interests_listingId_idx" ON "listing_interests"("listingId");

-- CreateIndex
CREATE INDEX "listing_interests_buyerId_idx" ON "listing_interests"("buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "listing_interests_listingId_buyerId_key" ON "listing_interests"("listingId", "buyerId");

-- AddForeignKey
ALTER TABLE "listing_interests" ADD CONSTRAINT "listing_interests_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_interests" ADD CONSTRAINT "listing_interests_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
