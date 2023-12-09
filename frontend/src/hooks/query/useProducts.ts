import productService from '@/components/services/product/product.service'
import { useQuery } from '@tanstack/react-query'

export const useProducts = () => {
	const { data } = useQuery({
		queryKey: ['products'],
		queryFn: () => productService.getAll(),
		select: ({ data }) => data
	})

	return { products: data }
}

export const useProductById = (id: string) => {
	const { data } = useQuery({
		queryKey: ['products', id],
		queryFn: () => productService.getById(id),
		select: ({ data }) => data
	})

	return { product: data }
}

export const useProductBySlug = (slug: string) => {
	const { data } = useQuery({
		queryKey: ['products', slug],
		queryFn: () => productService.getByCategorySlug(slug),
		select: ({ data }) => data
	})

	return { products: data }
}
