import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { PrismaService } from 'src/prisma.service';
import { GetAllOrderItemDto } from './dto/order-item.dto';
import { returnOrderItem } from './retrun-order-item.object';


@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: GetAllOrderItemDto) {
	const { productInfoId,quantity,price } = dto
	return this.prisma.orderItem.create({
		data: {
			productInfoId,
			quantity,
			price,
			orderId: null
		}
	})
}
  async update(id: number, dto: GetAllOrderItemDto) {
		const { orderId,productInfoId,quantity,price } = dto
		return this.prisma.orderItem.update({
			where: {
				id
			},
			data: {
        orderId,
        productInfoId,
        quantity,
        price,
			}
		})
	}

	async delete(id: number) {
		return this.prisma.orderItem.delete({ where: { id } })
	}

	async  byId(id: number) {
		const orderItem = await this.prisma.orderItem.findUnique({
			where: {
				id
			},
			select: returnOrderItem
		})
		// Ensure that there's a closing curly brace here

		if (!orderItem) {
			throw new error('orderItem not found')
		}

		return orderItem
	}

	async getAll() {
		return this.prisma.orderItem.findMany({
			select: returnOrderItem
		})
	}
}
