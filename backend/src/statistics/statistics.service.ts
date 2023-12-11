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
    const orders = await this.orderService.getAll();
    const totalIncome = orders.reduce((sum, order) => {
      const orderTotal = order.items.reduce((orderSum, item) => {
        const itemTotal = new Decimal(item.quantity).times(new Decimal(item.price));
        return orderSum.plus(itemTotal);
      }, new Decimal(0));
      return sum.plus(orderTotal);
    }, new Decimal(0));
    return totalIncome.toNumber();
  }

}
