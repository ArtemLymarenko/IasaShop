import { Dispatch, FC, SetStateAction} from 'react'
import { IProduct } from '@/types/product.interface'
import AddToCartButton from './add-to-cart-button/AddToCartButton'
import styles from './ProductVariations.module.scss'
import cn from 'clsx'
import { IProductInfo } from '@/types/productInfo.interface'

interface IProductVariations {
	product: IProduct
	sizes: IProductInfo[]
	selectedSize: IProductInfo
	setSelectedSize: Dispatch<SetStateAction<IProductInfo>>
}

const ProductVariations: FC<IProductVariations> = ({
	product,
	sizes,
	selectedSize,
	setSelectedSize
}) => {
	return (
		<div className={styles.variations}>
			<div>
				<p>Availiable sizes</p>
				<div className={styles.sizes}>
					{sizes.map(sizeItem => {
						if (sizeItem.amountStorage !== 0) {
							return (
								<button
									key={sizeItem.id}
									className={cn(styles.product, {
										[styles.active]: selectedSize.id === sizeItem.id
									})}
									onClick={() => setSelectedSize(sizeItem)}
								>
									{sizeItem.sizeName}
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
