import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './category.dto'
import { returnCategoryObject } from './return-category.object'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async byID(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			},
			select: returnCategoryObject
		})
		// Ensure that there's a closing curly brace here

		if (!category) {
			throw new Error('Category not found')
		}

		return category
	}

	async update(id: number, dto: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id
			},
			data: {
				category_name: dto.category_name
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
				category_name: ''
			}
		})
	}
	async getAll() {
		return this.prisma.category.findMany({
			select: returnCategoryObject
		})
	}
}
