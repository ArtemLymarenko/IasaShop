import { faker } from '@faker-js/faker'
import { PrismaClient, Product, User } from '@prisma/client'
import * as dotenv from 'dotenv'
import { getRandomNumber } from '../src/utils/random-number'

dotenv.config()
const prisma = new PrismaClient()

const createProducts = async (quantity: number) => {
	const products: Product[] = []

	for (let i = 0; i < quantity; i++) {
		const productName = faker.commerce.productName()
		const categoryName = faker.commerce.department()

		const product = await prisma.product.create({
			data: {
				product_name: productName,
				slug: faker.helpers.slugify(productName),
				description: faker.commerce.productDescription(),
				price: +faker.commerce.price(100, 2000, 0),
				images: Array.from({ length: getRandomNumber(2, 6) }).map(() =>
					faker.image.imageUrl()
				),
				category: {
					create: {
						category_name: categoryName,
						slug: faker.helpers.slugify(categoryName)
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
		const userName = faker.internet.userName()
		const firstName = faker.person.firstName()
		const lastName = faker.person.lastName()
		const email = faker.internet.email()
		const password = faker.internet.password()
		const phone = faker.phone.number()
		const isAdmin = false;

		const user = await prisma.user.create({
			data: {
				userName,
				firstName,
				lastName,
				email,
				password,
				phone,
				isAdmin
			}
		})

		users.push(user)
	}

	console.log(`Created ${users.length} user accounts`)
}

async function main() {
	console.log('Start seeding...')
	await createProducts(10)
	await createUserAccounts(5)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
