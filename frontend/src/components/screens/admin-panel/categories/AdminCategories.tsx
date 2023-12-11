import AdminList from '@/components/ui/admin/admin-list/AdminList'
import { FC, useState } from 'react'
import { useAdminCategories } from './useAdminCategories'
import styles from './AdminCategories.module.scss'
import { AddIcon } from '@chakra-ui/icons'
import Modal from '@/components/ui/modal/Modal'
import AddCategoryForm from './add-category/AddCategoryForm'

const AdminCategories: FC = () => {
	const { data, mutate } = useAdminCategories()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const header: string[] = ['Category name', 'Slug']
	return (
		<div className={styles.content}>
			<div className={styles.addButton}>
				<button onClick={() => setIsModalOpen(true)}>
					<AddIcon width={6} />
				</button>
			</div>
			<Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
				<AddCategoryForm />
			</Modal>
			<AdminList header={header} listItems={data} removeHandler={mutate} />
		</div>
	)
}

export default AdminCategories
