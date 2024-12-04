-- AlterEnum
ALTER TYPE "userStatus" ADD VALUE 'ACTIVE';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;
