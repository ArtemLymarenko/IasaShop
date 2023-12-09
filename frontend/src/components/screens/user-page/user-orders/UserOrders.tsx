import { FC } from 'react'
import styles from './UserOrder.module.scss'
import UserOrderItem from './UserOrderItem'

export interface IListItem {
	orderId: number
	items: string[]
}

export interface IUserList {
	listItems?: IListItem[]
}

const UserOrders: FC<IUserList> = ({ listItems = [] }) => {
	return (
		<div className={styles.items}>
			{listItems.length ? (
				listItems.map(listItem => (
					<UserOrderItem key={listItem.orderId} listItem={listItem} />
				))
			) : (
				<div className={styles.notFound}>Element was not found</div>
			)}
		</div>
	)
}

export default UserOrders
