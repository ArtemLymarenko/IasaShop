import { Prisma } from '@prisma/client'

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
		select: returnOrderInfo
	},
  
  }
