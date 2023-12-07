import { Prisma } from '@prisma/client'

export const returnCategoryObject: Prisma.CategorySelect = {
	id: true,
	categoryName: true,
	slug: true
}
