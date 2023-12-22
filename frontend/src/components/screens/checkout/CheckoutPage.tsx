import { FC, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom' // добавляем useHistory
import DeliveryForm from './delivery-form/DeliveryForm'
import { useCart } from '@/hooks/useCart'
import CheckoutItem from './checkout-item/CheckoutItem'
import { formatToCurrency } from '@/utils/format-to-currency'
import styles from './CheckoutPage.module.scss'
import Layout from '@/components/layout/Layout'
import Heading from '@/components/ui/heading/Heading'
import Button from '@/components/ui/button/Button'
import { EnumOrderStatus } from '@/types/order.interface'
import { PlaceOrderDto } from './placeOrder.dto'
import orderService from '@/components/services/order/order.service'
import { useGetProfile } from '@/hooks/useGetProfile'
import React from 'react'
import productInfoService from '@/components/services/product-info/product-info.service'

const CheckoutPage: FC = () => {
	const { cart, totalSum, clearCart } = useCart()
	const userInfo = useGetProfile()
	const [deliveryInfo, setDeliveryInfo] = useState({
		shipCountry: '',
		shipCity: '',
		shipRegion: '',
		shipPostalCode: '',
		shipAdress: ''
	})

	const navigate = useNavigate()
	const handlePlaceOrder = async () => {
		const modifiedItems = cart.map(cartItem => ({
			...cartItem,
			size: {
				...cartItem.size,
				productId: cartItem.product.id
			}
		}))
		const placeOrderDto: PlaceOrderDto = {
			status: EnumOrderStatus.PENDING,
			orderDate: new Date().toISOString(),
			userId: userInfo?.id || 0,
			totalSum: totalSum,
			items: modifiedItems,
			...deliveryInfo
		}

		try {
			await orderService.placeOrder(placeOrderDto)
			for (const cartItem of cart) {
				const { quantity, size } = cartItem
				const { id: sizeId } = size
				await productInfoService.updateProductQuantity(sizeId, quantity)
			}
			//console.log('Order placed successfully:', response.data);
			clearCart()
			toast.success('Order placed successfully!')
			setTimeout(() => {
				navigate('/')
			}, 2000)
		} catch (error) {
			toast.error('Error placing order. Please try again.')
			//console.error('Error placing order:', error);
		}
	}

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
					<DeliveryForm setDeliveryInfo={setDeliveryInfo} />
					<div className={styles.items}>
						<p>Your order</p>
						{cart &&
							cart.map(cartItem => (
								<React.Fragment key={cartItem.product.id}>
									<CheckoutItem
										product={cartItem.product}
										sizeInfo={cartItem.size}
										quantity={cartItem.quantity}
									/>
								</React.Fragment>
							))}
						<div className={styles.price}>
							Total: {formatToCurrency(totalSum)}
						</div>
					</div>
				</div>
				<Button onClick={handlePlaceOrder}>Place Order</Button>
				<ToastContainer
					position='bottom-center'
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					draggable
					pauseOnHover
					limit={1}
					style={{
						fontSize: '1.7em',
						maxWidth: '600px',
						maxHeight: '600px',
						width: '600px',
						height: '600px'
					}}
				/>
			</div>
		</Layout>
	)
}

export default CheckoutPage
