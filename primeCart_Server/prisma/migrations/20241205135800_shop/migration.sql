/*
  Warnings:

  - A unique constraint covering the columns `[vendorId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vendorId` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "vendorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shop_vendorId_key" ON "Shop"("vendorId");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
