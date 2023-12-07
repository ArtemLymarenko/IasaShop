import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ICategory } from '@/types/category.interface'

const MenuItem: FC<{ item: ICategory }> = ({ item }) => {
	return (
		<li>
			<Link to={`/categories/${item.slug}`}>{item.categoryName}</Link>
		</li>
	)
}

export default MenuItem
