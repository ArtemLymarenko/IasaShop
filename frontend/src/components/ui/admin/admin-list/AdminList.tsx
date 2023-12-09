import { FC } from 'react'
import { IListItem } from './admin-list.interface'
import AdminListItem from './AdminListItem'
import styles from './AdminList.module.scss'

interface IAdminList {
	header: string[]
	listItems?: IListItem[]
	removeHandler?: (id: number) => void
}

const AdminList: FC<IAdminList> = ({
	header = [],
	listItems = [],
	removeHandler
}) => {
	return (
		<div className={styles.items}>
			<div className={styles.header}>
				{header.length
					? header.map(headerItem => <div key={headerItem}>{headerItem}</div>)
					: ''}
				<div className={styles.placeholder}></div>
			</div>
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
