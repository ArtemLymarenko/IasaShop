import { IProductInfo } from './product-info.interface'

export interface IProduct {
	id: number
	productName: string
	slug: string
	price: number
	description: string
	images: string[]
	createdAt: string
	categoryId: number
	sizes: IProductInfo[]
}

export interface IProductDetails {
	product: IProduct
}
