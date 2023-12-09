import { FC } from 'react'
import MenuItem from './MenuItem.tsx'
import styles from './Menu.module.scss'
import { useCategories } from '@/hooks/query/useCategories.ts'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel.ts'
import { convertCategoryToMenuItems } from './convertCategoryToMenuItems.ts'
import { ADMIN_MENU } from './admin/admin-menu.data.ts'

const Menu: FC = () => {
	const { categories } = useCategories()

	const { isAdminPanel, path } = useIsAdminPanel()
	if (!categories) return ''

	return (
		<div className={styles.menu}>
			<nav>
				<ul>
					{(isAdminPanel
						? ADMIN_MENU
						: convertCategoryToMenuItems(categories)
					).map(category => (
						<MenuItem key={category.label} item={category} />
					))}
				</ul>
			</nav>
		</div>
	)
}

export default Menu
