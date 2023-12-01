import { ICartItem } from '@/types/cart.interface'

export interface IInitialState {
	items: ICartItem[]
}

//Omit - removes id from interface
export interface IAddCartPayload extends Omit<ICartItem, 'id'> {}

//Pick - adds id to interface
export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
	type: 'minus' | 'plus'
}
