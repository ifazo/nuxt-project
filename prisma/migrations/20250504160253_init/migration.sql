/*
  Warnings:

  - Made the column `createdAt` on table `blog_reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `blog_reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `blogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `blogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `product_reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `product_reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `shops` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `shops` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `wishlists` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `wishlists` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "blog_reviews" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "product_reviews" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "shops" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "wishlists" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
