import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { PrismaService } from 'src/prisma.service'
import { ProductService } from 'src/product/product.service'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, PrismaService, ProductService]
})
export class CategoryModule {}
