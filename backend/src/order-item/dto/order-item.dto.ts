import { IsNumber } from 'class-validator';

export class GetAllOrderItemDto {
    orderId: number;

    productInfoId: number;
  
    price: number;

    quantity: number;
}
