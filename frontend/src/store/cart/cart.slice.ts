import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	IAddCartPayload,
	IChangeQuantityPayload,
	IInitialState
} from './cart.types'
import { cartData } from '@/data/cart.data'

const initialState: IInitialState = {
	items: cartData
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<IAddCartPayload>) => {
			const isExists = state.items.some(
				item =>
					item.size.id === action.payload.size.id &&
					item.product.id === action.payload.product.id
			)
			if (!isExists) {
				state.items.push({ ...action.payload, id: state.items.length })
			}
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			state.items = state.items.filter(item => item.id !== action.payload.id)
		},
		changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
			const { id, type } = action.payload
			const item = state.items.find(item => item.id === id)

			if (item) {
				if (type === 'plus') item.quantity++
				else if (type === 'minus') item.quantity--
			}
		}
	}
})
