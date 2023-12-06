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
				slug: faker.helpers.slugify(productName).toLowerCase(),
				description: faker.commerce.productDescription(),
				price: +faker.commerce.price({ min: 100, max: 150, dec: 2 }),
				images: Array.from({ length: getRandomNumber(2, 6) }).map(() =>
				faker.image.url()
				),
				category: {
					create: {
						category_name: categoryName,
						slug: faker.helpers.slugify(categoryName).toLowerCase()
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

async function main() {
	console.log('Start seeding...')
	//await createProducts(10)
	await createUserAccounts(5)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
