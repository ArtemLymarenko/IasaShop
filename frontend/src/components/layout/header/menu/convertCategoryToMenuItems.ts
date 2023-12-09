import { ICategory } from '@/types/category.interface'
import { IMenuItem } from './admin/IMenuItem'

export const convertCategoryToMenuItems = (
	categories: ICategory[]
): IMenuItem[] => {
	return categories.map(category => ({
		label: category.categoryName,
		link: `/categories/${category.slug}`
	}))
}
