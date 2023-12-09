import { FC } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './UserPage.module.scss'
import Heading from '@/components/ui/heading/Heading'
import UserOrders, { IListItem } from './user-orders/UserOrders'

const UserPage: FC<{ pageTitle: string }> = ({ pageTitle }) => {
	const data: IListItem[] = [{ orderId: 1, items: ['a', 'a'] }]

	return (
		<Layout pageTitle={pageTitle}>
			<div className={styles.content}>
				<Heading>{pageTitle}</Heading>
				{/* add user info */}
				<UserOrders listItems={data} />
			</div>
		</Layout>
	)
}

export default UserPage
