import { IsInt, IsNumber, IsString } from 'class-validator';

export class ProductInfoDto {
  @IsString()
  sizeName: string;

  @IsInt()
  productId: number;

  @IsNumber()
  amountStorage: number;
}