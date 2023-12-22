import { Product, ProductInfo } from "@prisma/client"

export interface ICartItem {
	id: number
	product: Product
	quantity: number
	size: ProductInfo
}