import { ICategory } from '@/types/category.interface'
import { instance } from '../../api/api.interceptor'
import { ICategoryDto } from './categoryDto'

class CategoryService {
	async getAll() {
		return instance<ICategory[]>({
			url: '/categories',
			method: 'GET'
		})
	}

	async getById(id: number) {
		return instance<ICategory>({
			url: `/categories/${id}`,
			method: 'GET'
		})
	}

	async getBySlug(slug: string) {
		return instance<ICategory>({
			url: `/categories/by-slug/${slug}`,
			method: 'GET'
		})
	}

	async create(categoryDto: ICategoryDto) {
		return instance<ICategory>({
			url: `/categories`,
			method: 'POST',
			data: categoryDto
		})
	}

	async update(id: number, categoryName: string) {
		return instance<ICategory>({
			url: `/categories/${id}`,
			method: 'PUT',
			data: categoryName
		})
	}

	async delete(id: number) {
		return instance<ICategory>({
			url: `/categories/${id}`,
			method: 'DELETE'
		})
	}
}

export default new CategoryService()
