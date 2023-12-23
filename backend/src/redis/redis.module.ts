import { Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { RedisController } from './redis.controller'
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
	imports: [
		CacheModule.registerAsync({
			useFactory: () => ({
				store: redisStore,
				socket: {
					host: 'localhost',
					port: 6379,
					password: 'password'
				}
			})
		})
	],
	controllers: [RedisController],
	providers: [
		RedisService,
		{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }
	],
	exports: [RedisService, CacheModule]
})
export class RedisModule {}
