import { instance } from '../../api/api.interceptor'
import { IProduct } from '@/types/product.interface'
import { IProductDto } from './productDto.interface'

class ProductService {
	async getAll() {
		return instance<IProduct[]>({
			url: '/product',
			method: 'GET'
		})
	}

	async getById(id: string) {
		return instance<IProduct>({
			url: `/product/${id}`,
			method: 'GET'
		})
	}

	async create() {
		return instance<IProduct>({
			url: `/product`,
			method: 'POST'
		})
	}

	async update(id: string, productDto: IProductDto) {
		return instance<IProduct>({
			url: `/product/${id}`,
			method: 'PUT',
			data: productDto
		})
	}

	async delete(id: string) {
		return instance<IProduct>({
			url: `/product/${id}`,
			method: 'DELETE'
		})
	}
}

export default new ProductService()
