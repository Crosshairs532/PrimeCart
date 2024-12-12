/*
  Warnings:

  - You are about to drop the column `userId` on the `product_reviews` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `product_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_reviews" DROP CONSTRAINT "product_reviews_userId_fkey";

-- AlterTable
ALTER TABLE "product_reviews" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
