/*
  Warnings:

  - You are about to drop the column `createdAt` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `carts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_fkey";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "user";
