/*
  Warnings:

  - Added the required column `review` to the `product_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_reviews" ADD COLUMN     "review" TEXT NOT NULL;
