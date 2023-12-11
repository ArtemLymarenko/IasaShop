import { IStatistics } from '@/types/statistics.interface'
import { instance } from '@/components/api/api.interceptor'

class StatisticsService {
	async getMain() {
		return instance<IStatistics>({
			url: '/statistics',
			method: 'GET'
		})
	}
}

export default new StatisticsService()
