import { faker } from '@faker-js/faker'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './category.dto'
import { returnCategoryObject } from './return-category.object'
import { ProductService } from 'src/product/product.service'

@Injectable()
export class CategoryService {
	constructor(
		private prisma: PrismaService,
		private readonly productService: ProductService
	) {}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			},
			select: returnCategoryObject
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}

	//Need
	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug
			},
			select: returnCategoryObject
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}

	async update(id: number, dto: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id
			},
			data: {
				categoryName: dto.categoryName,
				slug: faker.helpers.slugify(dto.categoryName).toLowerCase()
			}
		})
	}

	async delete(id: number) {
		const products = await this.prisma.product.findMany({
			where: {
				categoryId: id
			}
		})

		for (const product of products) {
			await this.productService.delete(product.id)
		}

		return this.prisma.category.delete({
			where: {
				id
			}
		})
	}

	async create(dto: CategoryDto) {
		const { categoryName } = dto
		return this.prisma.category.create({
			data: {
				categoryName,
				slug: faker.helpers.slugify(dto.categoryName).toLowerCase()
			}
		})
	}
	async getAll() {
		return this.prisma.category.findMany({
			select: returnCategoryObject
		})
	}
}
