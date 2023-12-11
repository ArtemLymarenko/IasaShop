import { Controller, Get, HttpCode } from '@nestjs/common'
import { StatisticsService } from './statistics.service'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@HttpCode(200)
	@Get()
	async getMain() {
		return this.statisticsService.getMain()
	}
}
