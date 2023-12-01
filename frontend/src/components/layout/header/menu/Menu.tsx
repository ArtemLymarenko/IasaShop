import { FC } from 'react'
import { categories } from '@/data/categoty.data.ts'
import MenuItem from './menu-item/MenuItem.tsx'
import styles from './Menu.module.scss'

const Menu: FC = () => {
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
