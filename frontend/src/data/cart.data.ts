import { ICartItem } from '@/types/cart.interface'
import { products } from './product.data'
import { sizes } from './size.data'

export const cartData: ICartItem[] = [
	{
		id: 0,
		quantity: 1,
		product: products[0],
		size: sizes[0]
	},
	{
		id: 1,
		quantity: 1,
		product: products[1],
		size: sizes[2]
	},
	{
		id: 2,
		quantity: 1,
		product: products[2],
		size: sizes[1]
	}
]
