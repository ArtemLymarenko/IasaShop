import productInfoService from '@/components/services/product-info/product-info.service'
import productService from '@/components/services/product/product.service'
import { IListItem } from '@/components/ui/admin/admin-list/admin-list.interface'
import { getAdminUrl } from '@/config/url.config'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useAdminProducts = () => {
	const { data, refetch } = useQuery({
		queryKey: ['get admin products'],
		queryFn: async () => {
			const products = await productService.getAll()

			const productsWithInfo = await Promise.all(
				products.data.map(async product => {
					const productInfo = await productInfoService.getById(product.id)
					return {
						...product,
						productInfo: productInfo.data
					}
				})
			)

			return productsWithInfo
		},
		select: data =>
			data.map((product): IListItem => {
				return {
					id: product.id,
					viewUrl: `/products/${product.id}`,
					editUrl: getAdminUrl(`/products/edit/${product.id}`),
					items: [
						product.productName,
						product.categoryId.toString(),
						product.createdAt
					],
					productInfo: product.productInfo
				}
			})
	})

	const { mutate } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (id: number) => productService.delete(id),
		onSuccess: () => refetch()
	})

	return { data, mutate }
}
