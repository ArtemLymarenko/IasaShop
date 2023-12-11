import { FC } from 'react'
import { IAdminListItem } from './admin-list.interface'
import styles from './AdminList.module.scss'
import AdminActions from './admin-actions/AdminActions'

const AdminListItem: FC<IAdminListItem> = ({ removeHandler, listItem }) => {
	return (
		<div className={styles.item}>
			{listItem.items.map(item => (
				<div key={item}>{item}</div>
			))}
			<div>
				{listItem.productInfo &&
					listItem.productInfo.map(info => (
						<div key={info.id}>{`${info.sizeName}: ${info.amountStorage}`}</div>
					))}
			</div>
			<AdminActions
				viewUrl={listItem.viewUrl}
				editUrl={listItem.editUrl}
				removeHandler={removeHandler}
			/>
		</div>
	)
}

export default AdminListItem
