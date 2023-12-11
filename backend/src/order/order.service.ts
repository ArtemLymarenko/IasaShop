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

	async placeOrder(user_id: number,dto: GetAllOrderDto) {
		const { status, shipAdress, shipCity, shipCountry, shipPostalCode, shipRegion,userId} = dto;
	  
		return this.prisma.order.create({
		  data: {
			status,
			shipAdress,
			shipCity,
			shipCountry,
			shipPostalCode,
			shipRegion,
			userId: user_id
		  }
		});
	  }
	}
