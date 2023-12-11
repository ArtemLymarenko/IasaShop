import { ICartItem } from './cart.interface'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED ',
	SHIPPED = 'SHIPPED',
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
	items: ICartItem[]
	userId: number
}
