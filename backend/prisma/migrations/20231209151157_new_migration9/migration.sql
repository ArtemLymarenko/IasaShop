/*
  Warnings:

  - You are about to drop the column `order_name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `ProductSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ship_adress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ship_city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ship_country` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ship_postal_code` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ship_region` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_order_name_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "order_name",
ADD COLUMN     "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ship_adress" TEXT NOT NULL,
ADD COLUMN     "ship_city" TEXT NOT NULL,
ADD COLUMN     "ship_country" TEXT NOT NULL,
ADD COLUMN     "ship_postal_code" TEXT NOT NULL,
ADD COLUMN     "ship_region" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductSize";

-- CreateTable
CREATE TABLE "ProductInfo" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "size_name" VARCHAR(10) NOT NULL,
    "amount_storage" INTEGER NOT NULL,

    CONSTRAINT "ProductInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER,
    "product_info_id" INTEGER,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductInfo" ADD CONSTRAINT "ProductInfo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_product_info_id_fkey" FOREIGN KEY ("product_info_id") REFERENCES "ProductInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
