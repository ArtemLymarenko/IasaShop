import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import orderService from '@/components/services/order/order.service';


export const useOrderByUserId = (id: number) => {
	const { data } = useQuery({
		queryKey: ['get orders by user id'],
		queryFn: async () => await orderService.getByUser(+id),
		select: ({ data }) => data
	})
	return data
}
export const useAllOrders = () => {
	const { data } = useQuery({
		queryKey: ['get orders by user id'],
		queryFn: async () => await orderService.getAll(),
		select: ({ data }) => data
	})
	return data
}
export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
  
    const { mutate: deleteOrder } = useMutation({
      mutationKey: ['delete order'],
      mutationFn: (orderId: number) => orderService.deleteOrder(orderId),
      onSuccess: () => {
        queryClient.invalidateQueries(['delete order']);
      },
    });
  
    const handleDeleteOrder = (orderId: number) => {
      if (window.confirm('Are you sure you want to delete this order?')) {
        deleteOrder(orderId);
      }
    };
  
    return { handleDeleteOrder };
  };

  export const useUpdateStatus = () => {
    const queryClient = useQueryClient();

  const { mutate: updateOrderStatus } = useMutation({
    mutationKey: ['updateOrderStatus'],
    mutationFn: ({
      orderId,
      newStatus,
    }: {
      orderId: number;
      newStatus: string;
    }) => orderService.updateOrderStatus(orderId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries(['get orders']);
    },
  });

  const handleUpdateOrderStatus = async (
    orderId: number,
    newStatus: string
  ) => {
    if (!newStatus) {
      alert('Please select a status before updating.');
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to update the order status?'
    );
    if (confirmed) {
      await updateOrderStatus({ orderId, newStatus });
    }
  };
  return {handleUpdateOrderStatus}
  }