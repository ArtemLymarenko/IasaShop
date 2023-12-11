import { faker } from '@faker-js/faker'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { EnumProductSort, GetAllProductDto } from './dto/get-all.products.dto'
import { ProductDto } from './dto/product.dto'
import {
	productReturnObject,
	productReturnObjectFullSet
} from './return-product.object'

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async getAll(dto: GetAllProductDto = {}) {
		const { sort, searchTerm } = dto
		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		if (sort === EnumProductSort.LOW_PRICE) {
			prismaSort.push({ price: Prisma.SortOrder.asc })
		} else if (sort === EnumProductSort.HIGH_PRICE) {
			prismaSort.push({ price: Prisma.SortOrder.desc })
		} else if (sort === EnumProductSort.OLDEST) {
			prismaSort.push({ createdAt: Prisma.SortOrder.asc })
		} else {
			prismaSort.push({ createdAt: Prisma.SortOrder.desc })
		}

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							category: {
								categoryName: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							}
						},
						{
							productName: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						},

						{
							description: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						}
					]
			  }
			: {}

		const products = await this.prisma.product.findMany({
			where: prismaSearchTermFilter,
			orderBy: prismaSort
		})

		return products
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id
			},
			select: productReturnObjectFullSet
		})

		if (!product) {
			throw new NotFoundException('Product not found')
		}

		return product
	}
	async byCategorySlug(category_slug: string) {
		const product = await this.prisma.product.findMany({
			where: {
				category: {
					slug: category_slug
				}
			},
			select: productReturnObjectFullSet
		})

		if (!product) {
			throw new NotFoundException('Product not found')
		}

		return product
	}

	async getSimilar(id: number) {
		const currentProduct = await this.byId(id)
		if (!currentProduct)
			throw new NotFoundException('Current product not found')

		const products = await this.prisma.product.findMany({
			where: {
				category: {
					categoryName: currentProduct.category.categoryName
				},
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: {
				createdAt: Prisma.SortOrder.desc
			},
			select: productReturnObject
		})
		return products
	}
	async create(dto: ProductDto) {
		const { productName, price, description, images, categoryId } = dto
		return this.prisma.product.create({
			data: {
				productName,
				price,
				description,
				images,
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	async update(id: number, dto: ProductDto) {
		const { description, images, price, productName, categoryId } = dto
		return this.prisma.product.update({
			where: {
				id
			},
			data: {
				description,
				images,
				price,
				productName,
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	private async deleteProductInfos(productId: number) {
		await this.prisma.productInfo.deleteMany({
			where: {
				productId
			}
		})
	}

	async delete(id: number) {
		await this.deleteProductInfos(id)
		return this.prisma.product.delete({ where: { id } })
	}
}
