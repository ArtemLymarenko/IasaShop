import { Prisma } from '@prisma/client'

export const returnCategoryObject:Prisma.CategorySelect = {
    id: true,
    category_name: true,
    slug: true
}



