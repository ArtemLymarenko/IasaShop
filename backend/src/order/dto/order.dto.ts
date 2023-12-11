import { OrderItem, User } from "@prisma/client"
import { IsString } from "class-validator"

export enum EnumOrderStatus{
    PENDING = 'PENDING',
    PAYED = 'PAYED ',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
}

export class GetAllOrderDto{
    @IsString()
    status:string;

    @IsString()  // mb enum ?
    shipCountry:string;

    @IsString()
    shipCity:string;

    @IsString()
    shipRegion:string;

    @IsString()
    shipPostalCode:string;

    @IsString()
    shipAdress:string;

    @IsString()
    orderDate:string;
    
    items?: OrderItem[];
    userId?: number;
}