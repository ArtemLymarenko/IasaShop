import { IOrder } from '@/types/order.interface'
import { instance } from '../../api/api.interceptor'
import { IOrderDto } from './order.dto.interface';


class OrderService {
    async getByUser(userId: number): Promise<IOrder[]> {
        const response = await instance<IOrder[]>({
            url: `/order/${userId}`,
            method: 'GET',
        });
        return response.data;
    } 
    async getAll(): Promise<IOrder[]> {
        const response = await instance<IOrder[]>({
            url: `/order`,
            method: 'GET',
        });
        return response.data;

    }
    async placeOrder(orderDto: IOrderDto) {
		return instance<IOrder>({
			url: `/order`,
			method: 'PUT',
			data: orderDto
		})
	}   
}
export default new OrderService()
