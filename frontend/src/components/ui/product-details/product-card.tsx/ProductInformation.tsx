import { FC } from 'react'
import styles from './ProductCard.module.scss'
import { IProductDetails } from '@/types/product.interface'

const ProductInformation: FC<IProductDetails> = ({ product }) => {
	return (
		<div className={styles.headerInfo}>
			<h1>{product.name}</h1>
			<p>{product.description}</p>
		</div>
	)
}

export default ProductInformation
