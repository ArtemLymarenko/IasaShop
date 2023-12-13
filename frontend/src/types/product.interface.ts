import { ICategory } from './category.interface'
import { IProductInfo } from './productInfo.interface'

export interface IProduct {
	id: number
	productName: string
	price: number
	description: string
	images: string[]
	createdAt: string
	category: ICategory
	productInfo: IProductInfo[]
}

export interface IProductDetails {
	product: IProduct
}
