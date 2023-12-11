import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Put
} from '@nestjs/common'
import { ProductInfoService } from './product-info.service'
import { ProductInfoDto } from './dto/product-info.dto'

@Controller('product-info')
export class ProductInfoController {
	constructor(private readonly productInfoService: ProductInfoService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	//@Auth()
	@Post()
	async createProductInfo(@Body() dto: ProductInfoDto) {
		return this.productInfoService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	//@Auth()
	async updateProductInfo(
		@Param('id') id: string,
		@Body() dto: ProductInfoDto
	) {
		return this.productInfoService.update(+id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	//@Auth()
	async deleteProductInfo(@Param('id') id: string) {
		return this.productInfoService.delete(+id)
	}

	@HttpCode(200)
	@Get('by-productId/:id')
	async getSizeByProductId(@Param('id') productId: number) {
		return this.productInfoService.byProductId(+productId)
	}
}
