import { instance } from '../../api/api.interceptor'
import { IProductInfo } from '@/types/productInfo.interface'
import { IProductInfoDto } from './product-info.dto.interface'

class ProductInfoService {
	async getById(id: number) {
		return instance<IProductInfo>({
			url: `/product-info/by-productId/${id}`,
			method: 'GET'
		})
	}
	async create(productInfoDto: IProductInfoDto) {
		return instance<IProductInfo>({
			url: `/product-info`,
			method: 'POST',
			data: productInfoDto
		})
	}
	async updateProductQuantity(id: number, quantity: number) {
		return instance<IProductInfo>({
			url: `/product-info/by-id-update/${id}`,
			method: 'PUT',
			data: { quantity }
		})
	}
}

export default new ProductInfoService()
