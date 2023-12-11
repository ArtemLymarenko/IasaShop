import AdminList from '@/components/ui/admin/admin-list/AdminList'
import { FC, useState } from 'react'
import { useAdminProducts } from './useAdminProducts'
import Modal from '@/components/ui/modal/Modal'
import { AddIcon } from '@chakra-ui/icons'
import styles from './AdminProducts.module.scss'
import AddProductForm from './add-product/AddProductForm'

const AdminProducts: FC = () => {
	const { data, mutate } = useAdminProducts()
	const header: string[] = [
		'Product name',
		'Created At',
		'Price',
		'Category id',
		'Size/Quantity'
	]

	const [isModalOpen, setIsModalOpen] = useState(false)
	return (
		<div className={styles.content}>
			<div className={styles.addButton}>
				<button onClick={() => setIsModalOpen(true)}>
					<AddIcon width={6} />
				</button>
			</div>
			<Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
				<AddProductForm />
			</Modal>
			<AdminList header={header} listItems={data} removeHandler={mutate} />
		</div>
	)
}

export default AdminProducts
