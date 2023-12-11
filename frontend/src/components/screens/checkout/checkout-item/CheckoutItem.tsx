import { FC } from 'react'
import { IProduct } from '@/types/product.interface'
import styles from './CheckoutItem.module.scss'
import { formatToCurrency } from '@/utils/format-to-currency'
import { IProductInfo } from '@/types/product-info.interface'

interface CheckoutItemProps {
	product: IProduct
	sizeInfo: IProductInfo
	quantity: number
}

const CheckoutItem: FC<CheckoutItemProps> = ({
	product,
	sizeInfo,
	quantity
}) => {
	return (
		<div className={styles.row}>
			<div className={styles.imgWrapper}>
				<img src={product.images[0]} alt={product.productName} />
			</div>
			<div className={styles.information}>
				<div className={styles.name}>{product.productName}</div>
				<div className={styles.info}>
					Size: <span>{sizeInfo.sizeName}</span>
				</div>
				<div className={styles.info}>
					Quantity: <span>{quantity}</span>
				</div>
				<div className={styles.price}>
					Price: {formatToCurrency(product.price)}
				</div>
			</div>
		</div>
	)
}

export default CheckoutItem
