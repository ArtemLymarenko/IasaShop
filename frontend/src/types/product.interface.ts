export interface IProduct {
	id: number
	productName: string
	slug: string
	price: number
	description: string
	images: string[]
	createdAt: string
	categoryId: number
}

export interface IProductDetails {
	product: IProduct
}
