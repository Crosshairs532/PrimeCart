-- DropForeignKey
ALTER TABLE "follow_shop" DROP CONSTRAINT "follow_shop_shopId_fkey";

-- DropForeignKey
ALTER TABLE "follow_shop" DROP CONSTRAINT "follow_shop_userId_fkey";

-- AddForeignKey
ALTER TABLE "follow_shop" ADD CONSTRAINT "follow_shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_shop" ADD CONSTRAINT "follow_shop_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
