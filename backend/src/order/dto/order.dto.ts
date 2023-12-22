import { OrderItem } from '@prisma/client'
import { IsNumber, IsString } from 'class-validator'
import { IOrderItem } from 'src/order-item/order-item-interface.'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED ',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}
export class GetAllOrderDto {
	@IsString()
	status: string

	@IsString() // mb enum ?
	shipCountry: string

	@IsString()
	shipCity: string

	@IsString()
	shipRegion: string

	@IsString()
	shipPostalCode: string

	@IsString()
	shipAdress: string

	@IsString()
	orderDate: string

	items?: IOrderItem[]

    @IsNumber()
	userId?: number
    
    @IsNumber()
	totalSum: number
}
