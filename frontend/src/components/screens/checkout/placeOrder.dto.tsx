import { ICartItem } from "@/types/cart.interface"
import { EnumOrderStatus } from "@/types/order.interface"

export interface PlaceOrderDto {
	orderDate: string
	status: EnumOrderStatus
	shipCountry: string
	shipCity: string
	shipRegion: string
	shipPostalCode: string
	shipAdress: string
	items: ICartItem[]
	totalSum: number
	userId: number
}