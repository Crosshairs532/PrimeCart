/*
  Warnings:

  - You are about to drop the column `productId` on the `Coupon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shopId]` on the table `Coupon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_productId_fkey";

-- DropIndex
DROP INDEX "Coupon_productId_key";

-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "productId",
ADD COLUMN     "shopId" TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_shopId_key" ON "Coupon"("shopId");

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
