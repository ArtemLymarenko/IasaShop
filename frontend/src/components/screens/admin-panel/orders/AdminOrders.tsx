import AdminList from '@/components/ui/admin/admin-list/AdminList'
import { FC } from 'react'
import { useAdminOrders } from './useAdminOrders'

const AdminOrders: FC = () => {
	const { data, mutate } = useAdminOrders()
	const header: string[] = ['Order id', '...', '...']
	return <AdminList header={header} listItems={data} removeHandler={mutate} />
}

export default AdminOrders
