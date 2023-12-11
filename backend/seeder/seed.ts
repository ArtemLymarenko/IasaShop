import { getSize } from '../src/utils/random-size'
import { faker } from '@faker-js/faker'
import { Category, PrismaClient, Product, User } from '@prisma/client'
import * as dotenv from 'dotenv'
import { getRandomNumber } from '../src/utils/random-number'

dotenv.config()
const prisma = new PrismaClient()

const createCategories = async () => {
	const categories: Category[] = []

	const categoryArray: string[] = ['T-Shirt', 'Hoodie', 'Sweatshirt']
	for (let i = 0; i < categoryArray.length; i++) {
		const categoryName = categoryArray[i]
		const category = await prisma.category.create({
			data: {
				categoryName: categoryName,
				slug: faker.helpers.slugify(categoryName).toLowerCase()
			}
		})
		categories.push(category)
	}
	console.log(`Created ${categories.length} categories`)
}

const createProducts = async (quantity: number) => {
	const products: Product[] = []
	const allCategoryIds = await prisma.category.findMany({
		select: {
			id: true
		}
	})
	const categoryIds = allCategoryIds.map(category => category.id)
	for (let i = 0; i < quantity; i++) {
		const productName =
			faker.commerce.productName() +
			Math.floor(Math.random() * 5 + 1).toString()

		const randomCategoryId =
			categoryIds[Math.floor(Math.random() * categoryIds.length)]

		const product = await prisma.product.create({
			data: {
				productName: productName,
				description: faker.commerce.productDescription(),
				price: +faker.commerce.price({ min: 100, max: 150, dec: 2 }),
				images: Array.from({ length: getRandomNumber(2, 6) }).map(() =>
					faker.image.url()
				),
				category: {
					connect: {
						id: randomCategoryId
					}
				}
			}
		})
		products.push(product)
	}
	console.log(`Created ${products.length} products`)
}

const createUserAccounts = async (quantity: number) => {
	const users: User[] = []

	for (let i = 0; i < quantity; i++) {
		const user = await prisma.user.create({
			data: {
				userName: faker.internet.userName(),
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				phone: faker.phone.number(),
				isAdmin: false
			}
		})

		users.push(user)
	}

	console.log(`Created ${users.length} user accounts`)
}



const createProductInfo = async (quantity: number) => {
	try {
		// Получаем все ID продуктов
		const productIds = await prisma.product.findMany({
			select: {
				id: true
			}
		})

		// Создаем записи productInfo для каждого продукта
		for (const { id } of productIds) {
			const productInfoData = Array.from({ length: quantity }).map(
				(_, index) => ({
					sizeName: getSize(index),
					productId: id,
					amountStorage: getRandomNumber(20, 150)
				})
			)

			await prisma.productInfo.createMany({
				data: productInfoData
			})
		}

		console.log(`Created  ${quantity} product info for each products`)
	} catch (error) {
		console.error('Error creating product info:', error)
	}
}

async function main() {
	console.log('Start seeding...')
	//await createCategories()
	//await createProducts(10)
	await createUserAccounts(5)
	//await createProductInfo(3)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
