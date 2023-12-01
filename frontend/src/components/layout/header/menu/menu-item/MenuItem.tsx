import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ICategory } from '@/types/category.interface'

const MenuItem: FC<{ item: ICategory }> = ({ item }) => {
	return (
		<li>
			<Link to={`/category/${item.id}`}>{item.name}</Link>
		</li>
	)
}

export default MenuItem
