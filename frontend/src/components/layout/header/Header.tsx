import { FC } from 'react'
import styles from './Header.module.scss'
import Menu from './menu/Menu'
import Search from './search/Search'
import Cart from './cart/Cart'
import { Link } from 'react-router-dom'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link to='/'>
					<img src='/images/logo.svg' alt='IASA.SHOP' />
				</Link>
			</div>
			<div>
				<Menu />
				<Search />
				<Cart />
			</div>
		</header>
	)
}

export default Header
