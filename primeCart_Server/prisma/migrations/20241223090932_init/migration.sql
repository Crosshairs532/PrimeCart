/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `FlashSale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopId` to the `FlashSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorId` to the `FlashSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlashSale" ADD COLUMN     "shopId" TEXT NOT NULL,
ADD COLUMN     "vendorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FlashSale_productId_key" ON "FlashSale"("productId");

-- AddForeignKey
ALTER TABLE "FlashSale" ADD CONSTRAINT "FlashSale_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
