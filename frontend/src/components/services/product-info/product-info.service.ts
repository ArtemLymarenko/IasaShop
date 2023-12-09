import { instance } from '../../api/api.interceptor'
import { IProductInfo } from '@/types/product-info.interface'
import { IProductInfoDto } from './product-info.dto.interface'

class ProductInfoService {

	async getByProductId(id: number) {
		return instance<IProductInfo>({
			url: `/product-info/${id}`,
			method: 'GET'
		})
	}


	async create(productDto: IProductInfoDto) {
		return instance<IProductInfo>({
			url: `/product-info`,
			method: 'POST',
            data: productDto
		})
	}

	async update(id: number, productDto: IProductInfoDto) {
		return instance<IProductInfo>({
			url: `/product-info/${id}`,
			method: 'PUT',
			data: productDto
		})
	}

	async delete(id: number) {
		return instance<IProductInfo>({
			url: `/product-info/${id}`,
			method: 'DELETE'
		})
	}
}

export default new ProductInfoService()