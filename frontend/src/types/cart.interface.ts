import { IProduct } from './product.interface'
import { ISize } from './size.interface'

export interface ICartItem {
	id: number
	product: IProduct
	quantity: number
	size: ISize
}
