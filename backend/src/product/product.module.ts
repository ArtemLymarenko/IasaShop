import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { PrismaService } from 'src/prisma.service'
import { RedisModule } from 'src/redis/redis.module'
import { RedisService } from 'src/redis/redis.service'

@Module({
	imports: [RedisModule],
	controllers: [ProductController],
	providers: [ProductService, PrismaService, RedisService]
})
export class ProductModule {}
