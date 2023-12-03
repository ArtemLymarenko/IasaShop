-- CreateTable
CREATE TABLE "Orders" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order_name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Orders_order_name_key" ON "Orders"("order_name");
