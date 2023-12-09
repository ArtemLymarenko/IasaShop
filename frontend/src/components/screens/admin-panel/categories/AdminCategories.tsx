import AdminList from '@/components/ui/admin/admin-list/AdminList'
import { FC } from 'react'
import { useAdminCategories } from './useAdminCategories'

const AdminCategories: FC = () => {
	const { data, mutate } = useAdminCategories()
	const header: string[] = ['Category name', 'Slug']
	return <AdminList header={header} listItems={data} removeHandler={mutate} />
}

export default AdminCategories
