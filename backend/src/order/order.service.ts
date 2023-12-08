import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetAllOrderDto } from './dto/order.dto';
import { returnOrderInfoFullSet } from './return-order-info.object';
import { error } from 'console';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: GetAllOrderDto) {
	const { status,shipAdress,shipCity,shipCountry,shipPostalCode,shipRegion,shipType } = dto
	return this.prisma.order.create({
		data: {
		status,
		shipAdress,
		shipCity,
		shipCountry,
		shipPostalCode,
		shipRegion,
		}
	})
}
  async update(id: number, dto: GetAllOrderDto) {
		const { status,shipAdress,shipCity,shipCountry,shipPostalCode,shipRegion,shipType } = dto
		return this.prisma.order.update({
			where: {
				id
			},
			data: {
			status,
			shipAdress,
			shipCity,
			shipCountry,
			shipPostalCode,
			shipRegion,
			}
		})
	}

	async delete(id: number) {
		return this.prisma.order.delete({ where: { id } })
	}

	async  byId(id: number) {
		const order = await this.prisma.order.findUnique({
			where: {
				id
			},
			select: returnOrderInfoFullSet
		})
		// Ensure that there's a closing curly brace here

		if (!order) {
			throw new error('Product not found')
		}

		return order
	}

	async getAll() {
		return this.prisma.order.findMany({
			select: returnOrderInfoFullSet
		})
	}
}

