import { IOrder } from '@/types/order.interface';
import { useQuery } from '@tanstack/react-query';
import OrderService from '@/components/services/order/order.service';


export const useOrdersByCurrentUserId = (userId: number) => {
  const { data: orders, isLoading, isError, error } = useQuery<IOrder[]>({
    queryKey: ['order', userId],
    queryFn: () => OrderService.getByUser(userId)
  });

  return { orders, isLoading, isError, error };
}

export const useOrdersAll = () => {
  const { data: orders, isLoading, isError, error } = useQuery<IOrder[]>({
    queryKey: ['order'],
    queryFn: () => OrderService.getAll()
  });

  return { orders, isLoading, isError, error };
}

