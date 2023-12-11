import statisticService from '@/components/services/statistics/statistic.service'
import { useQuery } from '@tanstack/react-query'

export const useStatistics = () => {
	const { data } = useQuery({
		queryKey: ['total statictic'],
		queryFn: async () => await statisticService.getMain(),
		select: ({ data }) => data
	})

	return data
}
