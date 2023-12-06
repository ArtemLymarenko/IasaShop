import { IProduct } from '@/types/product.interface'
import { sizes } from './size.data'

export const products: IProduct[] = [
	{
		id: 0,
		name: 'T-Shirt',
		price: 1200,
		description: `Thin. Light. Black.
		T-shirt of the B.O.M.J line - the first unit of the counter-brand clothing line. 
		Brilliant quality combined with a refined approach to details, that big-name puffed-up companies can't brag about.
		Penye fabric Combination: 95% cotton, 5% spandex. 
	Density 170 gm/m²
		`,
		images: [
			'/images/products/3.webp',
			'/images/products/1.webp',
			'/images/products/2.webp'
		],
		createdAt: 'asd',
		category: {
			id: 0,
			name: 'T-Shirt',
			slug: 't-shirt'
		},
		slug: 't-shirt',
		sizes
	},
	{
		id: 2,
		name: 'T-Shirt2',
		price: 2300,
		description: `Thin. Light. Black.
		T-shirt of the B.O.M.J line - the first unit of the counter-brand clothing line. 
		Brilliant quality combined with a refined approach to details, that big-name puffed-up companies can't brag about.
		Penye fabric Combination: 95% cotton, 5% spandex. 
	Density 170 gm/m²
		`,
		images: [
			'/images/products/3.webp',
			'/images/products/2.webp',
			'/images/products/1.webp'
		],
		createdAt: 'asd',
		category: {
			id: 0,
			name: 'T-Shirt',
			slug: 't-shirt'
		},
		sizes,
		slug: 't-shirt'
	},
	{
		id: 3,
		name: 'T-Shirt3',
		price: 4200,
		description: `Thin. Light. Black.
		T-shirt of the B.O.M.J line - the first unit of the counter-brand clothing line. 
		Brilliant quality combined with a refined approach to details, that big-name puffed-up companies can't brag about.
		Penye fabric Combination: 95% cotton, 5% spandex. 
	Density 170 gm/m²
		`,
		images: [
			'/images/products/3.webp',
			'/images/products/1.webp',
			'/images/products/2.webp'
		],
		createdAt: 'asd',
		category: {
			id: 1,
			name: 'Sweetshot',
			slug: 't-shirt'
		},
		slug: 't-shirt',
		sizes
	},
	{
		id: 4,
		name: 'T-Shirt4',
		price: 4200,
		description: `Thin. Light. Black.
		T-shirt of the B.O.M.J line - the first unit of the counter-brand clothing line. 
		Brilliant quality combined with a refined approach to details, that big-name puffed-up companies can't brag about.
		Penye fabric Combination: 95% cotton, 5% spandex. 
	Density 170 gm/m²
		`,
		images: [
			'/images/products/3.webp',
			'/images/products/1.webp',
			'/images/products/2.webp'
		],
		createdAt: 'asd',
		category: {
			id: 1,
			name: 'Sweetshot',
			slug: 't-shirt'
		},
		slug: 't-shirt',
		sizes
	}
]
