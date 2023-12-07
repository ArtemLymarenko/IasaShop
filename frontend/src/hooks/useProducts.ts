import productService from '@/components/services/product/product.service'
import { useQuery } from '@tanstack/react-query'

export const useProducts = () => {
	const { data } = useQuery({
		queryKey: ['get products'],
		queryFn: () => productService.getAll(),
		select: ({ data }) => data
	})

	return { products: data }
}
