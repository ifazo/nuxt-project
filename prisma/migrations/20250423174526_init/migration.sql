-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_shop_fkey";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_shop_fkey" FOREIGN KEY ("shop") REFERENCES "shops"("name") ON DELETE CASCADE ON UPDATE CASCADE;
