import { ICategory } from './category.interface'
import { ISize } from './size.interface'

export interface IProduct {
	id: number
	name: string
	slug: string
	price: number
	description: string
	images: string[]
	createdAt: string
	category: ICategory //replace by categoryId
	sizes: ISize[]
}

export interface IProductDetails {
	product: IProduct
}
