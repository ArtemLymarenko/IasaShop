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
	async create(productInfDto: IProductInfoDto) {
		return instance<IProductInfo>({
			url: `/product-info`,
			method: 'POST',
			data: productInfDto
		})
	}
}

export default new ProductInfoService()
