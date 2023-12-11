import { Controller, Get, HttpCode } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @HttpCode(200)
  @Get('users')
  async getTotalUsers() {
    return this.statisticsService.getTotalUsers();
  }

  @HttpCode(200)
  @Get('products')
  async getTotalProducts() {
    return this.statisticsService.getTotalProducts();
  }

  @HttpCode(200)
  @Get('orders')
  async getTotalOrders() {
    return this.statisticsService.getTotalOrders();
  }

  @HttpCode(200)
  @Get('income')
  async getTotalIncome() {
    return this.statisticsService.getTotalIncome();
  }
}