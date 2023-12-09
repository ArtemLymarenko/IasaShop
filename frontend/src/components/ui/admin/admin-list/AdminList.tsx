import { FC } from 'react'
import { IListItem } from './admin-list.interface'
import AdminListItem from './AdminListItem'
import styles from './AdminList.module.scss'

interface IAdminList {
	listItems?: IListItem[]
	removeHandler?: (id: number) => void
}

const AdminList: FC<IAdminList> = ({ listItems = [], removeHandler }) => {
	return (
		<div className={styles.items}>
			{listItems.length ? (
				listItems.map(listItem => (
					<AdminListItem
						key={listItem.id}
						removeHandler={
							removeHandler ? () => removeHandler(listItem.id) : undefined
						}
						listItem={listItem}
					/>
				))
			) : (
				<div className={styles.notFound}>Element was not found</div>
			)}
		</div>
	)
}

export default AdminList
