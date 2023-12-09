import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IMenuItem } from './admin/IMenuItem'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	return (
		<li>
			<Link to={item.link}>{item.label}</Link>
		</li>
	)
}

export default MenuItem
