import { instance } from '../../api/api.interceptor'
import { IProductInfo } from '@/types/productInfo.interface'
import { IProductInfoDto } from './product-info.dto.interface'

class ProductInfoService {
	async getById(id: string) {
		return instance<IProductInfo[]>({
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
	async update(id: number, productInfDto: IProductInfoDto) {
		return instance<IProductInfo>({
			url: `/product-info/${id}`,
			method: 'PUT',
			data: productInfDto
		})
	}
}

export default new ProductInfoService()
