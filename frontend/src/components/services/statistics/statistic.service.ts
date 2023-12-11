import { IStatistics } from "@/types/statistics.interface"
import { instance } from "@/components/api/api.interceptor"

class StatisticsService {
	async getTotalUsers() {
		return instance<IStatistics>({
			url: '/statistics/users',
			method: 'GET'
		})
	}

	async getTotalProducts() {
		return instance<IStatistics>({
			url: `/statistics/products`,
			method: 'GET'
		})
	}

	async getTotalOrders() {
		return instance<IStatistics>({
			url: `/statistics/orders`,
			method: 'GET'
		})
	}

	async getTotalIncome() {
		return instance<IStatistics>({
			url: `/statistics/income`,
			method: 'GET',
		})
	}

}

export default new StatisticsService()
