import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class RedisService {
	constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

	async get(key: string) {
		console.log(`GET ${key}`)
		return await this.cache.get(key)
	}

	async set(key: string, value: unknown) {
		console.log(`SET ${key}`)
		await this.cache.set(key, value)
	}

	async del(key: string) {
		console.log(`DEL ${key}`)
		await this.cache.del(key)
	}
}
