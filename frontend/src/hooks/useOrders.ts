
import { useQuery } from '@tanstack/react-query';
import orderService from '@/components/services/order/order.service';


export const useOrderByUserId = (id: number) => {
	const { data } = useQuery({
		queryKey: ['get orders by user id'],
		queryFn: async () => await orderService.getByUser(+id),
		select: ({ data }) => data
	})
	return data
}
