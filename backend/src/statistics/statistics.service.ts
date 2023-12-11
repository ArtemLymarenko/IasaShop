import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductService } from 'src/product/product.service'
import { OrderService } from 'src/order/order.service'
import { UserService } from 'src/user/user.service'
import { Decimal } from '@prisma/client/runtime/library'
import { IStatistics } from './statistics.dto'

@Injectable()
export class StatisticsService {
	constructor(
		private prisma: PrismaService,
		private orderService: OrderService
	) {}

	async getMain(): Promise<IStatistics> {
		const usersCount = await this.prisma.user.count()
		const productsCount = await this.prisma.product.count()
		const ordersCount = await this.orderService
			.getAll()
			.then(orders => orders.length)

		const orders = await this.orderService.getAll()
		const totalIncome = orders.reduce((sum, order) => {
			const orderTotal = order.items.reduce((orderSum, item) => {
				const itemTotal = new Decimal(item.quantity).times(
					new Decimal(item.price)
				)
				return orderSum.plus(itemTotal)
			}, new Decimal(0))
			return sum.plus(orderTotal)
		}, new Decimal(0))

		return {
			usersCount,
			productsCount,
			ordersCount,
			totalIncome: parseInt(totalIncome.toString(), 10)
		}
	}
}
