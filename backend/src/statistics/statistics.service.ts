import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/user/user.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService,
  ) {}

  async getTotalUsers(): Promise<number> {
    const usersCount = await this.prisma.user.count();
    return usersCount;
  }

  async getTotalProducts(): Promise<number> {
    const productsCount = await this.prisma.product.count();
    return productsCount;
  }

  async getTotalOrders(): Promise<number> {
    const ordersCount = await this.orderService.getAll().then((orders) => orders.length);
    return ordersCount;
  }

  async getTotalIncome(): Promise<number> {
    const products = await this.productService.getAll();
    const totalIncome = products.reduce((sum, product) => {
      return sum.plus(new Decimal(product.price));
    }, new Decimal(0));
    return totalIncome.toNumber(); // Convert Decimal back to number
  }

}
