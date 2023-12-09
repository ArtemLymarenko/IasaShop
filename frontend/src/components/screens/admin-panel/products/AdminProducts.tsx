import AdminList from '@/components/ui/admin/admin-list/AdminList'
import { FC } from 'react'
import { useAdminProducts } from './useAdminProducts'

const AdminProducts: FC = () => {
	const { data, mutate } = useAdminProducts()
	const header: string[] = [
		'Product name',
		'Category name',
		'Created At',
		'Size/Quantity'
	]
	return <AdminList header={header} listItems={data} removeHandler={mutate} />
}

export default AdminProducts
