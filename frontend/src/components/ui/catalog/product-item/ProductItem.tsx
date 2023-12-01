import { IProduct } from '@/types/product.interface'
import { FC } from 'react'
import styles from './ProductItem.module.scss'
import { Link } from 'react-router-dom'

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<Link to={`/products/${product.id}`} className={styles.categoryProduct}>
			<div className={styles.productCover}>
				<div className={styles.price}>
					<span>{product.price} UAH</span>
				</div>
				<div className={styles.imgContent}>
					<img src={product.images[0]} alt={product.name} />
				</div>
			</div>
			<button className={styles.name}>{product.name}</button>
		</Link>
	)
}

export default ProductItem
