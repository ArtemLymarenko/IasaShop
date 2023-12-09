import { FC } from 'react'
import styles from './UserOrder.module.scss'
import { IListItem, IUserList } from './UserOrders'

interface IUserListItem {
	listItem: IListItem
}

const UserOrderItem: FC<IUserListItem> = ({ listItem }) => {
	return (
		<div className={styles.item}>
			<div>{listItem.orderId}</div>
			{listItem.items.map(item => (
				<div key={item}>{item}</div>
			))}
		</div>
	)
}

export default UserOrderItem
