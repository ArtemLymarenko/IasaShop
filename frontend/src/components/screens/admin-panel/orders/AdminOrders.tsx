import { FC } from 'react'
import { useAllOrders } from './all-user-orders/useAdminOrders'
import AdminOrderInfo from './all-user-orders/all-user-orders'
import { useGetProfile } from '@/hooks/useGetProfile'

const AdminOrders: FC = () => {
	const data = useAllOrders()
	return <AdminOrderInfo data={data} />
}
export default AdminOrders
