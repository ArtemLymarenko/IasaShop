import { Module } from '@nestjs/common'
import { StatisticsService } from './statistics.service'
import { StatisticsController } from './statistics.controller'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { ProductService } from 'src/product/product.service'
import { OrderService } from 'src/order/order.service'
import { RedisModule } from 'src/redis/redis.module'
import { RedisService } from 'src/redis/redis.service'

@Module({
	imports: [RedisModule],
	controllers: [StatisticsController],
	providers: [
		StatisticsService,
		ProductService,
		OrderService,
		PrismaService,
		UserService,
		RedisService
	]
})
export class StatisticsModule {}
