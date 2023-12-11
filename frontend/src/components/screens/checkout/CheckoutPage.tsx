import { FC } from 'react'
import DeliveryForm from './delivery-form/DeliveryForm'
import { useCart } from '@/hooks/useCart'
import CheckoutItem from './checkout-item/CheckoutItem'
import { formatToCurrency } from '@/utils/format-to-currency'
import styles from './CheckoutPage.module.scss'
import Layout from '@/components/layout/Layout'
import Heading from '@/components/ui/heading/Heading'

const CheckoutPage: FC = () => {
	const { cart, totalSum } = useCart()

	return (
		<Layout pageTitle='Checkout'>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					width: '100%'
				}}
			>
				<Heading>Checkout</Heading>
				<div className={styles.layout}>
					<DeliveryForm />
					<div className={styles.items}>
						<p>Your order</p>
						{cart &&
							cart.map(cartItem => (
								<CheckoutItem
									product={cartItem.product}
									sizeInfo={cartItem.size}
									quantity={cartItem.quantity}
								/>
							))}
						<div className={styles.price}>
							Total: {formatToCurrency(totalSum)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default CheckoutPage
