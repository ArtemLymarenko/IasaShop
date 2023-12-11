import { IsNumber } from 'class-validator';

export class GetAllOrderItemDto {
    @IsNumber()
    orderId: number;
    
    @IsNumber()
    productInfoId: number;
  
    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
}
