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
		const { status, shipAdress, shipCity, shipCountry, shipPostalCode, shipRegion, orderDate, items } = dto;
	  
		// Step 1: Place the order without orderItems
		const createdOrder = await this.prisma.order.create({
		  data: {
			status,
			shipAdress,
			shipCity,
			shipCountry,
			shipPostalCode,
			shipRegion,
			orderDate,
		  },
		});
	  
		// Step 2: Retrieve the orderId
		const orderId = createdOrder.id;
	  
		// Step 3: Fetch orderItems where orderId is null
		if (items && items.length > 0) {
		  const orderItemsToUpdate = await this.prisma.orderItem.findMany({
			where: {
			  orderId: 99,
			  id: {
				in: items.map((item) => item.id),
			  },
			},
		  });
	  
		  // Step 4: Update orderItems with the orderId
		  if (orderItemsToUpdate && orderItemsToUpdate.length > 0) {
			await this.prisma.orderItem.updateMany({
			  where: {
				id: {
				  in: orderItemsToUpdate.map((item) => item.id),
				},
			  },
			  data: {
				orderId,
			  },
			});
		  }
		}
	  
		// Now you can return the created order
		return createdOrder;
	  }
	  
	  
	  
  
  // Other methods remain unchanged
}
	
