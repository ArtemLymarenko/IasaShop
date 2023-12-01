import { FC, useState } from 'react'
import styles from '../ProductCard.module.scss'
import { IProductDetails } from '@/types/product.interface'
import { formatToCurrency } from '@/utils/format-to-currency'
import Slider from './Slider'

const ProductImage: FC<IProductDetails> = ({ product }) => {
	return (
		<div className={styles.productImage}>
			<Slider images={product.images} />

			<div className={styles.price}>
				<p>{formatToCurrency(product.price)}</p>
			</div>
		</div>
	)
}

export default ProductImage
