import { OrderItem } from "@prisma/client"
import { ICartItem } from "src/order-item/cart-item-interface"

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED ',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}
export interface PlaceOrderDto {
	orderDate: string
	status: EnumOrderStatus
	shipCountry: string
	shipCity: string
	shipRegion: string
	shipPostalCode: string
	shipAdress: string
	items: ICartItem[]
	userId: number
	totalSum: number
}