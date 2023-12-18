import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	HttpCode,
	Put,
	ValidationPipe
} from '@nestjs/common'
import { OrderService } from './order.service'
import { PlaceOrderDto } from './dto/place-order.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get('get-by-user/:id')
	@Auth()
	async getByUser(@Param('id') userId: number) {
		return this.orderService.getByUser(+userId)
	}

	@Get('get-all')
	@Auth('admin')
	async getAll() {
		return this.orderService.getAll()
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async placeOrder(@Body() dto: PlaceOrderDto) {
		return this.orderService.placeOrder(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth('admin')
	async updateOrderStatus(
		@Param('id') id: string,
		@Body() { newStatus }: { newStatus: string }
	) {
		return this.orderService.updateOrderStatus(+id, newStatus)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth('admin')
	async deleteOrder(@Param('id') id: number) {
		return this.orderService.delete(+id)
	}
}
