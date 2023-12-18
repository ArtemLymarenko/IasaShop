import { IOrder } from '@/types/order.interface'
import { instance } from '../../api/api.interceptor'
import { PlaceOrderDto } from '@/components/screens/checkout/placeOrder.dto';


class OrderService {
    async getByUser(userId: number){
        return instance<IOrder[]>({
            url: `/order/get-by-user/${userId}`,
            method: 'GET',
        });
    } 
    async getAll(){
        return instance<IOrder[]>({
            url: `/order/get-all`,
            method: 'GET',
        });
    } 
    async placeOrder(orderDto: PlaceOrderDto) {
		return instance<IOrder>({
			url: `/order`,
			method: 'POST',
			data: orderDto
		})
	}
    async deleteOrder(orderId: number) {
        return instance<IOrder>({
          url: `/order/${orderId}`,
          method: 'DELETE'
        })
    }
    async updateOrderStatus(orderId: number, newStatus: string) {
        console.log('Updating order status:', orderId, newStatus);
      
        return instance<IOrder>({
          url: `/order/${orderId}`,
          method: 'PUT',
          data: { newStatus }
        });
      }
      
}
export default new OrderService()
