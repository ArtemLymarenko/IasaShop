import { ICategory } from './category.interface'
import { ISize } from './size.interface'

export interface IProduct {
	id: number
	productName: string
	slug: string
	price: number
	description: string
	images: string[]
	createdAt: string
	categoryId: number //replace by categoryId
	sizes: ISize[]
}

export interface IProductDetails {
	product: IProduct
}
