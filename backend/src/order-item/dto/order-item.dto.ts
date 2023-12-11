import { IsNumber } from 'class-validator';

export class GetAllOrderItemDto {
    orderId?: number;
    
    @IsNumber()
    productInfoId: number;
  
    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
}
