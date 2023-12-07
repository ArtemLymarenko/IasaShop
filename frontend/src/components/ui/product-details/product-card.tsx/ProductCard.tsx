import { FC, useState } from 'react'
import ProductImage from './product-images/ProductImage'
import { ISize } from '@/types/size.interface'
import styles from './ProductCard.module.scss'
import ProductInformation from './ProductInformation'
import { IProductDetails } from '@/types/product.interface'
import ProductVariations from './product-variations/ProductVariations'

const ProductCard: FC<IProductDetails> = ({ product }) => {
	product.sizes = [
		{ id: 0, size: 'XS', isAvailible: true },
		{ id: 1, size: 'M', isAvailible: true },
		{ id: 2, size: 'L', isAvailible: true }
	]
	const [selectedSize, setSelectedSize] = useState<ISize>(product.sizes[0])

	return (
		<div className={styles.card}>
			<ProductImage product={product} />
			<div className={styles.information}>
				<ProductInformation product={product} />
				<ProductVariations
					product={product}
					selectedSize={selectedSize}
					setSelectedSize={setSelectedSize}
				/>
			</div>
		</div>
	)
}

export default ProductCard
