/*
  Warnings:

  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_product_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "products" JSONB[];

-- DropTable
DROP TABLE "carts";
