import { FC } from 'react'
import styles from './CartItem.module.scss'
import { ICartItem } from '@/types/cart.interface'
import CartActions from './cart-actions/CartActions'
import { formatToCurrency } from '@/utils/format-to-currency'

const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
	return (
		<div className={styles.item}>
			<div className={styles.imgContent}>
				<img src={item.product.images[0]} alt={item.product.productName} />
			</div>

			<div>
				<div className={styles.name}>{item.product.productName}</div>
				<div className={styles.itemSize}>
					Size: <span>{item.size.size}</span>
				</div>
				<div className={styles.price}>
					{formatToCurrency(item.product.price)}
				</div>
				<CartActions item={item} />
			</div>
		</div>
	)
}

export default CartItem
