/*
  Warnings:

  - You are about to drop the column `orderId` on the `blacklists` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vendorId]` on the table `blacklists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shopId]` on the table `blacklists` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `blacklists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `blacklists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorId` to the `blacklists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blacklists" DROP CONSTRAINT "blacklists_orderId_fkey";

-- AlterTable
ALTER TABLE "blacklists" DROP COLUMN "orderId",
ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "shopId" TEXT NOT NULL,
ADD COLUMN     "vendorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "blacklists_vendorId_key" ON "blacklists"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "blacklists_shopId_key" ON "blacklists"("shopId");

-- AddForeignKey
ALTER TABLE "blacklists" ADD CONSTRAINT "blacklists_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blacklists" ADD CONSTRAINT "blacklists_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blacklists" ADD CONSTRAINT "blacklists_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
