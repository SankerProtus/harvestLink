-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'REVIEW_COMMENT';

-- CreateTable
CREATE TABLE "review_comments" (
    "id" UUID NOT NULL,
    "reviewId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "body" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "review_comments_reviewId_idx" ON "review_comments"("reviewId");

-- AddForeignKey
ALTER TABLE "review_comments" ADD CONSTRAINT "review_comments_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_comments" ADD CONSTRAINT "review_comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
