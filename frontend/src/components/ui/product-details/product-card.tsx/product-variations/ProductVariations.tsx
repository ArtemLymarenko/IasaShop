import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IProduct } from '@/types/product.interface'
import AddToCartButton from './add-to-cart-button/AddToCartButton'
import styles from './ProductVariations.module.scss'
import { ISize } from '@/types/size.interface'
import cn from 'clsx'

interface IProductVariations {
	product: IProduct
	selectedSize: ISize
	setSelectedSize: Dispatch<SetStateAction<ISize>>
}

const ProductVariations: FC<IProductVariations> = ({
	product,
	selectedSize,
	setSelectedSize
}) => {
	return (
		<div className={styles.variations}>
			<div>
				<p>Availiable sizes</p>
				<div className={styles.sizes}>
					{product.sizes.map(sizeItem => {
						if (sizeItem.isAvailible) {
							return (
								<button
									key={sizeItem.size}
									className={cn(styles.product, {
										[styles.active]: selectedSize === sizeItem
									})}
									onClick={() => setSelectedSize(sizeItem)}
								>
									{sizeItem.size}
								</button>
							)
						}
					})}
				</div>
			</div>
			<AddToCartButton product={product} selectedSize={selectedSize} />
		</div>
	)
}

export default ProductVariations
