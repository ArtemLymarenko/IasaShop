import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetAllOrderDto } from './dto/order.dto';
import { returnOrderInfoFullSet } from './return-order-info.object';
import { error } from 'console';
import { returnProductInfoObject } from 'src/product-info/return-product-info.object';
import { PlaceOrderDto } from './dto/place-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  
  async update(id: number, dto: GetAllOrderDto) {
	const { status, shipAdress, shipCity, shipCountry, shipPostalCode, shipRegion, userId } = dto;
  
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
		shipRegion
	  }
	});
  }
  async updateOrderStatus(id: number, newStatus: string) {
	return this.prisma.order.update({
	  where: { id },
	  data: { status: newStatus },
	});
  }

	async delete(id: number) {
		return this.prisma.order.delete({ where: { id } })
	}

	async getAll(){
			return this.prisma.order.findMany({
				orderBy:{
					id:'asc'
				},
				select: returnOrderInfoFullSet
			})
	}

	async getByUser(userId: number) {
		return this.prisma.order.findMany({
		  where: {
			userId,
		  },
		  orderBy: {
			id: 'asc',
		  },
		  select: returnOrderInfoFullSet,
		});
	  }
	


	async placeOrder(dto: PlaceOrderDto) {
		const {totalSum, userId, status, shipAdress, shipCity, shipCountry, shipPostalCode, shipRegion, orderDate, items } = dto;
	
		// Create the order
		const createdOrder = await this.prisma.order.create({
			data: {
				status,
				shipAdress,
				shipCity,
				shipCountry,
				shipPostalCode,
				shipRegion,
				orderDate,
				userId,
				totalSum
			},
			include: {
				items: true, // Include the associated items in the response
			},
		});
	
		// Extract the order ID from the created order
		const orderId = createdOrder.id;
	
		// Create the associated OrderItems with the orderId
		const createdOrderItems = await this.prisma.orderItem.createMany({
			data: items.map(item => ({
				price: item.product.price,
				quantity: item.quantity,
				productInfoId: item.size.id,
				orderId,
			})),
		});
	
		// Return the created order with associated items
		return {
			order: createdOrder,
			items: createdOrderItems,
		};
	}
	  
}
	
