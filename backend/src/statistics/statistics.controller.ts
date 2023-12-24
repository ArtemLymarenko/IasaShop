import { Controller, Get, HttpCode } from '@nestjs/common'
import { StatisticsService } from './statistics.service'
import { RedisService } from 'src/redis/redis.service'

@Controller('statistics')
export class StatisticsController {
	constructor(
		private readonly statisticsService: StatisticsService,
		private readonly redisService: RedisService
	) {}

	@HttpCode(200)
	@Get()
	async getMain() {
		const statistics = await this.redisService.get('statistics')
		if (statistics) {
			return statistics
		}
		const statisticsFromDb = await this.statisticsService.getMain()

		await this.redisService.set('statistics', JSON.stringify(statisticsFromDb))

		return statisticsFromDb
	}
}
