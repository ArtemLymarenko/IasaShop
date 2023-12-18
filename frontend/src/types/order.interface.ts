import { ICartItem } from './cart.interface'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED ',
	AWAITING = 'AWAITING',
	DELIVERED = 'DELIVERED'
}
export interface IOrder {
	id: number
	orderDate: string
	status: EnumOrderStatus
	shipCountry: string
	shipCity: string
	shipRegion: string
	shipPostalCode: string
	shipAdress: string
	totalSum: number
	items: ICartItem[]
	userId: number
}
