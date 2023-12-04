import { Prisma } from '@prisma/client'
import { returnCategoryObject } from 'src/category/return-category.object'

export const productReturnObject: Prisma.ProductSelect = {
    images:true,
    description:true,
    id:true,
    product_name:true,
    price:true,
    createdAt:true,
    slug:true,
}


export const productReturnObjectFullSet:Prisma.ProductSelect = {
   ...productReturnObject,
   category: {
    select : returnCategoryObject 
   }
}