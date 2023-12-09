import { IProduct } from './product.interface'
import { IProductInfo } from './productInfo.interface'

export interface ICartItem {
	id: number
	product: IProduct
	quantity: number
	size: IProductInfo
}
