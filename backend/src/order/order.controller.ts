import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpCode, Put, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetAllOrderDto } from './dto/order.dto';
import { ProductDto } from 'src/product/dto/product.dto';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  
  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	//@Auth()
	@Post()
	async createProduct(@Body() dto: GetAllOrderDto ) {
		return this.orderService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	//@Auth()
	async updateProduct(@Param('id') id: string, @Body() dto: GetAllOrderDto) {
		return this.orderService.update(+id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	//@Auth()
	async deleteProduct(@Param('id') id: string) {
		return this.orderService.delete(+id)
	}

	@Get(':id')
	//@Auth()
	async getProduct(@Param('id') id: string) {
		return this.orderService.byId(+id)
	}

  @HttpCode(200)
	@Get()
	async getAll() {
		return this.orderService.getAll()
	}

}
