/*
  Warnings:

  - You are about to drop the column `slug` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_slug_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "slug";
