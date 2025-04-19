-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'PAID';

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PAID';
