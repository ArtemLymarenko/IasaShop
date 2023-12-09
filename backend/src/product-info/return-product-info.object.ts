import { Prisma } from '@prisma/client'

export const returnProductInfoObject: Prisma.ProductInfoSelect = {
  id: true,
  sizeName: true,
  productId: true,
  amountStorage: true,
}
