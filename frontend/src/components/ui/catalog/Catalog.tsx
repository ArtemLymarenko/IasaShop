import { IProduct } from '@/types/product.interface'
import { FC } from 'react'
import ProductItem from './product-item/ProductItem'
import styles from './Catalog.module.scss'
import Heading from '../heading/Heading'

interface ICatalog {
	products: IProduct[]
	title: string
}

const Catalog: FC<ICatalog> = ({ products, title }) => {
	return (
		<section className={styles.catalog}>
			<Heading>{title}</Heading>
			<div className={styles.products}>
				{products.length
					? products.map(product => (
							<ProductItem product={product} key={product.id} />
					  ))
					: 'There is empty...'}
			</div>
		</section>
	)
}

export default Catalog
