import categoryService from '@/components/services/category/category.service'
import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
	const { data } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAll(),
		select: ({ data }) => data
	})

	return { categories: data }
}

export const useCategoryById = (id: number) => {
	const { data } = useQuery({
		queryKey: ['categories', id],
		queryFn: () => categoryService.getById(id),
		select: ({ data }) => data
	})

	return { category: data }
}

export const useCategoryBySlug = (slug: string) => {
	const { data } = useQuery({
		queryKey: ['categories', slug],
		queryFn: () => categoryService.getBySlug(slug),
		select: ({ data }) => data
	})

	return { category: data }
}
