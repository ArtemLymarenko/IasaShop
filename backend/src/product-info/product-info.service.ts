import { Injectable } from '@nestjs/common'
import { returnProductInfoObject } from './return-product-info.object'
import { PrismaService } from 'src/prisma.service'
import { ProductInfoDto } from './dto/product-info.dto'

@Injectable()
export class ProductInfoService {
	constructor(private prisma: PrismaService) {}
	async create(dto: ProductInfoDto) {
		const { productId, sizeName, amountStorage } = dto
		return this.prisma.productInfo.create({
			data: {
				productId,
				sizeName,
				amountStorage
			}
		})
	}
	async update(id: number, dto: ProductInfoDto) {
		const { productId, sizeName, amountStorage } = dto
		return this.prisma.productInfo.update({
			where: {
				id
			},
			data: {
				productId,
				sizeName,
				amountStorage
			}
		})
	}
	async updateProductQuantity(id: number, quantity: number) {
		const productInfo = await this.prisma.productInfo.findUnique({
		  where: {
			id,
		  },
		});
	
		if (!productInfo) {
		  throw new Error(`ProductInfo with id ${id} not found`);
		}
	
		const newAmountStorage = Math.max(0, productInfo.amountStorage - quantity);
	
		return this.prisma.productInfo.update({
		  where: {
			id,
		  },
		  data: {
			amountStorage: newAmountStorage,
		  },
		});
	  }

	async delete(id: number) {
		return this.prisma.productInfo.delete({ where: { id } })
	}

	async byProductId(productId: number) {
		const productInfo = await this.prisma.productInfo.findMany({
			where: {
				productId
			},
			select: returnProductInfoObject
		})

		return productInfo
	}

	async getAll() {
		return this.prisma.productInfo.findMany({
			select: returnProductInfoObject
		})
	}
}
