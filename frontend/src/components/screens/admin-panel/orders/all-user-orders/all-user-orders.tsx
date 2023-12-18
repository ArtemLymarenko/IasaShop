import { FC } from 'react'
import { IOrder } from '@/types/order.interface'
import { formatDate } from '@/utils/format-date'
import styles from './all-user-orders.module.scss'
import { useDeleteOrder, useUpdateStatus } from './useAdminOrders'
import { RiDeleteRow, RiEdit2Line } from 'react-icons/ri'

interface AdminOrderInfoProps {
	data?: IOrder[]
}

const AdminOrderInfo: FC<AdminOrderInfoProps> = ({ data }) => {
	const { handleDeleteOrder } = useDeleteOrder()
	const { handleUpdateOrderStatus } = useUpdateStatus()

	return (
		<div className={styles.items}>
			<div className={styles.header}>
				<div>Order id</div>
				<div>User id</div>
				<div>Total sum</div>
				<div>Order Date</div>
				<div>Order status</div>
				<div className={styles.placeholder}></div>
			</div>
			{data && data.length ? (
				data.map(order => (
					<div className={styles.adminOrderInfo} key={order.id}>
						<div>{order.id}</div>
						<div>{order.userId}</div>
						<div>{order.totalSum}</div>
						<div>{formatDate(order.orderDate)}</div>
						<div>{order.status}</div>
						<div className={styles.placeholder}>
							<button onClick={() => handleDeleteOrder(order.id)}>
								<RiDeleteRow />
							</button>
							<select
								value={order.status}
								onChange={e =>
									handleUpdateOrderStatus(order.id, e.target.value)
								}
							>
								<option value='' disabled>
									Select Status
								</option>
								<option value='PENDING'>PENDING</option>
								<option value='PAYED'>PAYED</option>
								<option value='SHIPPED'>SHIPPED</option>
								<option value='AWAITING'>AWAITING</option>
							</select>
							<RiEdit2Line />
						</div>
					</div>
				))
			) : (
				<div className={styles.notFound}>Orders were not found</div>
			)}
		</div>
	)
}

export default AdminOrderInfo
