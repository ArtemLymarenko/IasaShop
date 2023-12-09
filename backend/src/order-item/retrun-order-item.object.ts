import { Prisma } from '@prisma/client'

export const returnOrderItem: Prisma.OrderItemSelect = {
   orderId: true,
   productInfoId:true,
   price: true,
   quantity: true
}
