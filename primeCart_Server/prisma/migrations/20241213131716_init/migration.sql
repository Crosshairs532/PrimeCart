/*
  Warnings:

  - You are about to drop the column `price` on the `orders` table. All the data in the column will be lost.
  - Added the required column `purchasedPrice` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "price",
ADD COLUMN     "coupon" TEXT,
ADD COLUMN     "purchasedPrice" INTEGER NOT NULL;
