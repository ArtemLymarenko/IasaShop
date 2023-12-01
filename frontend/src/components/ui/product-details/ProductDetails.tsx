import { FC } from 'react'
import ProductCard from './product-card.tsx/ProductCard'
import { IProductDetails } from '@/types/product.interface'
import styles from './ProductDetails.module.scss'

const ProductDetails: FC<IProductDetails> = ({ product }) => {
	return (
		<div className={styles.productDetails}>
			<ProductCard product={product} />
		</div>
	)
}

export default ProductDetails
