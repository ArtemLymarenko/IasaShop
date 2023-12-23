import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { ProductInfoModule } from './product-info/product-info.module'
import { OrderItemModule } from './order-item/order-item.module'
import { OrderModule } from './order/order.module'
import { StatisticsModule } from './statistics/statistics.module'
import { RedisModule } from './redis/redis.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		ProductModule,
		CategoryModule,
		ProductInfoModule,
		OrderItemModule,
		OrderModule,
		StatisticsModule,
		RedisModule
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
