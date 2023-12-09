import { FC } from 'react'
import styles from './Header.module.scss'
import Menu from './menu/Menu'
import Search from './search/Search'
import Cart from './cart/Cart'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ADMIN_PANEL, USER_PANEL } from '@/config/url.config'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'

const Header: FC = () => {
	const { user } = useAuth()
	const { isAdminPanel } = useIsAdminPanel()

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				{isAdminPanel ? (
					<Link to='/'>Admin Panel</Link>
				) : (
					<Link to='/'>
						<img src='/images/logo.svg' alt='IASA.SHOP' />
					</Link>
				)}
			</div>
			<div>
				<Menu />
				<Search />
				<div className={styles.users}>
					{user?.isAdmin && (
						<Link to={ADMIN_PANEL}>
							<img src='/images/users/admin-user.png' alt='admin' />
						</Link>
					)}
					<Link to={USER_PANEL}>
						<img src='/images/users/user.svg' alt='user' />
					</Link>
					<Cart />
				</div>
			</div>
		</header>
	)
}

export default Header
