import { FC } from 'react'
import MenuItem from './menu-item/MenuItem.tsx'
import styles from './Menu.module.scss'
import { useCategories } from '@/hooks/useCategories.ts'

const Menu: FC = () => {
	const { categories } = useCategories()

	if (!categories) return ''

	return (
		<div className={styles.menu}>
			<nav>
				<ul>
					{categories.map(category => (
						<MenuItem key={category.id} item={category} />
					))}
				</ul>
			</nav>
		</div>
	)
}

export default Menu
