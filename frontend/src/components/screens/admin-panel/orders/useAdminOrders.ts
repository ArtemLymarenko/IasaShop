import productService from '@/components/services/product/product.service'
import { IListItem } from '@/components/ui/admin/admin-list/admin-list.interface'
import { getAdminUrl } from '@/config/url.config'
import { useMutation, useQuery } from '@tanstack/react-query'

//Redo to orders service
export const useAdminOrders = () => {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['get admin orders'],
		queryFn: () => productService.getAll(),
		select: data =>
			data.data.map((product): IListItem => {
				return {
					id: product.id,
					viewUrl: `/products/${product.id}`,
					editUrl: getAdminUrl(`/products/edit/${product.id}`),
					items: [
						product.productName,
						product.categoryId.toString(),
						product.createdAt
					]
				}
			})
	})

	const { mutate } = useMutation({
		mutationKey: ['delete orders'],
		mutationFn: (id: number) => productService.delete(id),
		onSuccess: () => refetch()
	})

	return { data, mutate, isFetching }
}
