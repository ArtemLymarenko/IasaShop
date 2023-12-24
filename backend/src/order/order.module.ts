import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { PrismaService } from 'src/prisma.service'
import { RedisModule } from 'src/redis/redis.module'
import { RedisService } from 'src/redis/redis.service'

@Module({
	imports: [RedisModule],
	controllers: [OrderController],
	providers: [OrderService, PrismaService, RedisService]
})
export class OrderModule {}
