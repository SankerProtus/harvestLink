-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "farmerId" UUID NOT NULL,
    "buyerId" UUID NOT NULL,
    "rating" SMALLINT NOT NULL,
    "comment" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_listings" (
    "id" UUID NOT NULL,
    "listingId" UUID NOT NULL,
    "buyerId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_listings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_orderId_key" ON "reviews"("orderId");

-- CreateIndex
CREATE INDEX "reviews_farmerId_idx" ON "reviews"("farmerId");

-- CreateIndex
CREATE INDEX "reviews_buyerId_idx" ON "reviews"("buyerId");

-- CreateIndex
CREATE INDEX "saved_listings_buyerId_idx" ON "saved_listings"("buyerId");

-- CreateIndex
CREATE INDEX "saved_listings_listingId_idx" ON "saved_listings"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "saved_listings_buyerId_listingId_key" ON "saved_listings"("buyerId", "listingId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_listings" ADD CONSTRAINT "saved_listings_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_listings" ADD CONSTRAINT "saved_listings_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
