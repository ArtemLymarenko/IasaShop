import AdminList from '@/components/ui/admin/admin-list/AdminList'
import { FC } from 'react'
import { useAdminProducts } from './useAdminProducts'

const AdminProducts: FC = () => {
	const { data, mutate } = useAdminProducts()
	return <AdminList listItems={data} removeHandler={mutate} />
}

export default AdminProducts
