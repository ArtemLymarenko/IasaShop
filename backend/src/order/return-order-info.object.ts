import { Prisma } from '@prisma/client'
import { returnOrderItem } from 'src/order-item/retrun-order-item.object'

export const returnOrderInfo: Prisma.OrderSelect = {
  id: true,
  orderDate: true,
  status: true,
  shipAdress:true,
  shipCity: true,
  shipCountry: true,
  shipPostalCode: true,
  shipRegion: true,
  userId: true
}

export const returnOrderInfoFullSet: Prisma.OrderSelect = {
    ...returnOrderInfo,
	items: {
		select: returnOrderItem
	},
  
  }
