import { instance } from '../../api/api.interceptor'
import { IProduct } from '@/types/product.interface'
import { IProductDto } from './product.dto.interface'

class ProductService {
	async getAll() {
		return instance<IProduct[]>({
			url: '/products',
			method: 'GET'
		})
	}

	async getById(id: string) {
		return instance<IProduct>({
			url: `/products/${id}`,
			method: 'GET'
		})
	}

	async getByCategorySlug(slug: string) {
		return instance<IProduct[]>({
			url: `/products/by-category/${slug}`,
			method: 'GET'
		})
	}

	async create() {
		return instance<IProduct>({
			url: `/products`,
			method: 'POST'
		})
	}

	async update(id: string, productDto: IProductDto) {
		return instance<IProduct>({
			url: `/products/${id}`,
			method: 'PUT',
			data: productDto
		})
	}

	async delete(id: string) {
		return instance<IProduct>({
			url: `/products/${id}`,
			method: 'DELETE'
		})
	}
}

export default new ProductService()
