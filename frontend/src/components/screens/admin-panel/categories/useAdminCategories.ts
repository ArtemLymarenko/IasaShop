import categoryService from '@/components/services/category.service'
import productService from '@/components/services/product/product.service'
import { IListItem } from '@/components/ui/admin/admin-list/admin-list.interface'
import { getAdminUrl } from '@/config/url.config'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useAdminCategories = () => {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['get admin categories'],
		queryFn: () => categoryService.getAll(),
		select: data =>
			data.data.map((category): IListItem => {
				return {
					id: category.id,
					viewUrl: `/categories/${category.slug}`,
					editUrl: getAdminUrl(`/products/edit/${category.slug}`),
					items: [category.categoryName, '/' + category.slug]
				}
			})
	})

	const { mutate } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (id: number) => categoryService.delete(id),
		onSuccess: () => refetch()
	})

	return { data, mutate, isFetching }
}
