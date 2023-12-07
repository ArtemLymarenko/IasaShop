import { faker } from '@faker-js/faker'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './category.dto'
import { returnCategoryObject } from './return-category.object'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			},
			select: returnCategoryObject
		})
		// Ensure that there's a closing curly brace here

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}
	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug
			},
			select: returnCategoryObject
		})
		// Ensure that there's a closing curly brace here

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
		return this.prisma.category.delete({
			where: {
				id
			}
		})
	}
	async create() {
		return this.prisma.category.create({
			data: {
				categoryName: '',
				slug: ''
			}
		})
	}
	async getAll() {
		return this.prisma.category.findMany({
			select: returnCategoryObject
		})
	}
}
