import { FC } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './UserPage.module.scss'
import Heading from '@/components/ui/heading/Heading'
import { IOrder } from '@/types/order.interface'
import { useOrdersAll } from '@/hooks/useOrders'
import { useActions } from '@/hooks/useActions'
import Button from '@/components/ui/button/Button'

const UserPage: FC<{ pageTitle: string }> = ({ pageTitle }) => {
	const { orders, isLoading, isError, error } = useOrdersAll()
	const { logout } = useActions()
	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError && error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<Layout pageTitle={pageTitle}>
			<div className={styles.userPage}>
				<Heading>{pageTitle}</Heading>
				{orders && orders.length > 0 ? (
					orders.map((order: IOrder) => (
						<div key={order.orderDate}>
							<p>Order Date: {order.orderDate}</p>
							<p>Order adress: {order.shipAdress}</p>
							<p>Order city: {order.shipCity}</p>
							<p>Order userId: {order.userId}</p>
							{/* Display other order details as needed */}
						</div>
					))
				) : (
					<p>No orders available.</p>
				)}
				<Button onClick={logout}>Logout</Button>
			</div>
		</Layout>
	)
}

export default UserPage
