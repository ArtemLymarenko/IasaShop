import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { GetAllProductDto } from './dto/get-all.products.dto'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { RedisService } from 'src/redis/redis.service'

@Controller('products')
export class ProductController {
	constructor(
		private readonly productService: ProductService,
		private readonly redisService: RedisService
	) {}

	@HttpCode(200)
	@Get()
	async getAll(@Query() queryDto: GetAllProductDto) {
		const products = await this.redisService.get('products')
		if (products) {
			return products
		}

		const productsFromDb = await this.productService.getAll(queryDto)
		await this.redisService.set('products', JSON.stringify(productsFromDb))

		return productsFromDb
	}

	@HttpCode(200)
	@Get('similar/:id')
	async getSimilar(@Param('id') id: string) {
		return this.productService.getSimilar(+id)
	}

	@HttpCode(200)
	@Get('by-category/:categorySlug')
	getProductByCategory(@Param('categorySlug') categorySlug: string) {
		return this.productService.byCategorySlug(categorySlug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Post()
	async createProduct(@Body() dto: ProductDto) {
		return this.productService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth('admin')
	async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.update(+id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth('admin')
	async deleteProduct(@Param('id') id: string) {
		return this.productService.delete(+id)
	}

	@Get(':id')
	@Auth()
	async getProduct(@Param('id') id: string) {
		return this.productService.byId(+id)
	}
}
