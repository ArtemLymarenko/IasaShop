import { FC } from 'react'
import styles from './AdminActions.module.scss'
import { IListItem } from '../admin-list.interface'
import { useNavigate } from 'react-router-dom'
import { RiExternalLinkLine, RiEdit2Line, RiDeleteRow } from 'react-icons/ri'

interface IAdminActions extends Pick<IListItem, 'editUrl' | 'viewUrl'> {
	removeHandler?: () => void
}

const AdminActions: FC<IAdminActions> = ({
	editUrl,
	viewUrl,
	removeHandler
}) => {
	const navigate = useNavigate()
	return (
		<div className={styles.actions}>
			{viewUrl && (
				<button onClick={() => navigate(viewUrl)}>
					<RiExternalLinkLine />
				</button>
			)}
			{editUrl && (
				<button onClick={() => navigate(editUrl)}>
					<RiEdit2Line />
				</button>
			)}
			{removeHandler && (
				<button onClick={removeHandler}>
					<RiDeleteRow />
				</button>
			)}
		</div>
	)
}

export default AdminActions
