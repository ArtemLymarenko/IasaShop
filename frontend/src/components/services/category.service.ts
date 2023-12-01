import { ICategory } from '@/types/category.interface'
import { instance } from '../api/api.interceptor'

class CategoryService {
	async getAll() {
		return instance<ICategory[]>({
			url: '/category',
			method: 'GET'
		})
	}

	async getById(id: string) {
		return instance<ICategory>({
			url: `/category/${id}`,
			method: 'GET'
		})
	}

	async create() {
		return instance<ICategory>({
			url: `/category`,
			method: 'POST'
		})
	}

	async update(id: string, categoryName: string) {
		return instance<ICategory>({
			url: `/category/${id}`,
			method: 'PUT',
			data: categoryName
		})
	}

	async delete(id: string) {
		return instance<ICategory>({
			url: `/category/${id}`,
			method: 'DELETE'
		})
	}
}

export default new CategoryService()
