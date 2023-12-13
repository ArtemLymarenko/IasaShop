import { Prisma } from '@prisma/client'
import { returnCategoryObject } from 'src/category/return-category.object'
import { returnProductInfoObject } from 'src/product-info/return-product-info.object'

export const productReturnObject: Prisma.ProductSelect = {
	id: true,
	images: true,
	description: true,
	productName: true,
	price: true,
	createdAt: true
}

export const productReturnObjectFullSet: Prisma.ProductSelect = {
	...productReturnObject,
	category: {
		select: returnCategoryObject
	},
	productInfo: {
		select: returnProductInfoObject
	}
}
