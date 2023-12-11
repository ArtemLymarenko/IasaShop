import { IProduct } from './product.interface'
import { IProductInfo } from './product-info.interface'

export interface ICartItem {
	id: number
	product: IProduct
	quantity: number
	sizeInfo: IProductInfo
}
