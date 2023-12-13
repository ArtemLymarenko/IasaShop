import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetAllOrderDto } from './dto/order.dto';
import { returnOrderInfoFullSet } from './return-order-info.object';
import { error } from 'console';
import { returnProductInfoObject } from 'src/product-info/return-product-info.object';

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
  

	async delete(id: number) {
		return this.prisma.order.delete({ where: { id } })
	}

	async getAll(){
			return this.prisma.order.findMany({
				orderBy:{
					createdAt:'desc'
				},
				include: {
					items:{
						include:{
							productInfo:{
								select: returnProductInfoObject
							}
						}
					}
				}
			})
	}

	async getByUser(userId: number){
		return this.prisma.order.findMany({
			where: {
				id:userId
			},
			select: returnOrderInfoFullSet

			
		})
	}


	async placeOrder(dto: GetAllOrderDto) {
		const { userId,status, shipAdress, shipCity, shipCountry, shipPostalCode, shipRegion, orderDate, items } = dto;
	  
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
			userId
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
			price: item.price,
			quantity: item.quantity,
			productInfoId: item.productInfoId,
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
	
