import { ICartItem } from "@/types/cart.interface";
export enum EnumOrderStatus{
    PENDING = 'PENDING',
    PAYED = 'PAYED ',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
}
export interface IOrderDto{
    id: number,
    orderDate: string,
    status:EnumOrderStatus;
    shipCountry:string;
    shipCity:string;
    shipRegion:string;
    shipPostalCode:string;
    shipAdress:string;
    items: ICartItem[];
    userId: number;
}