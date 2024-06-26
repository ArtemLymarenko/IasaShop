import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { OrderItemService } from './order-item.service'
import { GetAllOrderItemDto } from './dto/order-item.dto'

@Controller('order-item')
export class OrderItemController {
	constructor(private readonly orderItemService: OrderItemService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	//@Auth()
	@Post()
	async createOrderItem(@Body() dto: GetAllOrderItemDto) {
		return this.orderItemService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	//@Auth()
	async updateOrderItem(
		@Param('id') id: string,
		@Body() dto: GetAllOrderItemDto
	) {
		return this.orderItemService.update(+id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	//@Auth()
	async deleteOrderItem(@Param('id') id: string) {
		return this.orderItemService.delete(+id)
	}

	@Get(':id')
	//@Auth()
	async getOrderItem(@Param('id') id: string) {
		return this.orderItemService.byId(+id)
	}

	@HttpCode(200)
	@Get()
	async getAll() {
		return this.orderItemService.getAll()
	}
}
