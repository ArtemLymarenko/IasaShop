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
import { GetAllOrderDto } from './dto/order.dto'
import { ProductDto } from 'src/product/dto/product.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get(':id')
	//@Auth()
	async getByUser(userId:number) {
		return this.orderService.getByUser(+userId)
	}

	@Get()
	//@Auth()
	async getAll() {
		return this.orderService.getAll();
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	//@Auth()
	@Post()
	async placeOrder(@Body() dto: GetAllOrderDto) {
		return this.orderService.placeOrder(dto)
	}


	@HttpCode(200)
	@Delete(':id')
	//@Auth()
	async deleteOrder(@Param('id') id: number) {
		return this.orderService.delete(+id)
	}
	
}
