import { ICategory } from './category.interface'
import { ISize } from './size.interface'

export interface IProduct {
	id: number
	name: string
	price: number
	description: string
	images: string[]
	category: ICategory //replace by categoryId
	sizes: ISize[]
	reviews: []
}

export interface IProductDetails {
	product: IProduct
}
