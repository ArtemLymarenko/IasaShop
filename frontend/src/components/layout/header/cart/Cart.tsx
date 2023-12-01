import { FC, useRef, useState } from 'react'
import styles from './Cart.module.scss'
import CartItem from './cart-item/CartItem'
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay
} from '@chakra-ui/react'
import { formatToCurrency } from '@/utils/format-to-currency'
import { useCart } from '@/hooks/useCart'

const Cart: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const btnRef = useRef<HTMLButtonElement>(null)

	const { cart, totalSum } = useCart()

	return (
		<div className={styles['wrapper-cart']}>
			<button className={styles.heading} onClick={() => setIsOpen(!isOpen)}>
				<div className={styles.badge}>{cart.length}</div>
				<span className={styles.text}>MY BASKET</span>
			</button>

			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={() => setIsOpen(!isOpen)}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader letterSpacing='0.1em'>My basket</DrawerHeader>

					<DrawerBody>
						<div className={styles.cart}>
							{cart.length ? (
								cart.map(item => <CartItem key={item.id} item={item} />)
							) : (
								<div className={styles.alertMessage}>Your basket is empty!</div>
							)}
						</div>
					</DrawerBody>

					<DrawerFooter justifyContent='space-between'>
						<div className={styles.footer}>
							<div>Total: </div>
							<div>{formatToCurrency(totalSum)}</div>
						</div>
						<Button
							bg='#000000'
							color='#ffffff'
							borderRadius='10px'
							height='50px'
							width='120px'
							_hover={{
								bg: '#ffffff',
								color: '#000000',
								border: '1px solid black'
							}}
						>
							Checkout
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	)
}

export default Cart
