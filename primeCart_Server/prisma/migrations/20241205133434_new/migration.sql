/*
  Warnings:

  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Vendor` table. All the data in the column will be lost.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL;
