import { Prisma } from '@prisma/client'
import {ArrayMinSize , IsNumber, IsOptional, IsString } from 'class-validator'

export class ProductDto implements Prisma.ProductUpdateInput{
    @IsString()
    product_name : string

    @IsNumber()
    price: number

    @IsOptional()
    @IsString()
    description:string
    

    @IsString({each: true})
    @ArrayMinSize(1)
    images:string[]

    @IsNumber()
    category_id: number
}