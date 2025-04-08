/*
  Warnings:

  - You are about to drop the column `brand` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `products` table. All the data in the column will be lost.
  - Added the required column `shop` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "brand",
DROP COLUMN "discountPercentage",
DROP COLUMN "rating",
DROP COLUMN "thumbnail",
ADD COLUMN     "shop" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "shops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shops_slug_key" ON "shops"("slug");

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_shop_fkey" FOREIGN KEY ("shop") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
