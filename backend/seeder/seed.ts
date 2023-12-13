import { getSize } from '../src/utils/random-size'
import { faker } from '@faker-js/faker'
import { Category, PrismaClient, Product, User } from '@prisma/client'
import * as dotenv from 'dotenv'
import { getRandomNumber } from '../src/utils/random-number'
import { getRandomImages, imagesByCategory } from '../src/utils/random-image'

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
	const allCategories = await prisma.category.findMany({
		select: {
			id: true,
			categoryName: true
		}
	})

	for (let i = 0; i < quantity; i++) {
		const productName =
			faker.commerce.productName() +
			Math.floor(Math.random() * 5 + 1).toString()

		const randomCategory =
			allCategories[Math.floor(Math.random() * allCategories.length)]

		const categoryImages = imagesByCategory[randomCategory.categoryName]

		if (!categoryImages) {
			console.error(
				`Images not defined for category: ${randomCategory.categoryName}`
			)
			return
		}

		const numberOfImages = getRandomNumber(2, 6)
		const selectedImages = getRandomImages(categoryImages, numberOfImages)

		const product = await prisma.product.create({
			data: {
				productName: productName,
				description: faker.commerce.productDescription(),
				price: +faker.commerce.price({ min: 500, max: 1000, dec: 2 }),
				images: selectedImages,
				category: {
					connect: {
						id: randomCategory.id
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
	//await createProducts(25)
	//await createUserAccounts(20)
	await createProductInfo(3)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
