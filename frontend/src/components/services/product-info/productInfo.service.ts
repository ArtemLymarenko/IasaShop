import { instance } from '@/components/api/api.interceptor'
import { IProductInfo } from '@/types/productInfo.interface'

class ProductInfoService {
	async getById(id: number) {
		return instance<IProductInfo[]>({
			url: `/product-info/by-productId/${id}`,
			method: 'GET'
		})
	}
}

export default new ProductInfoService()
