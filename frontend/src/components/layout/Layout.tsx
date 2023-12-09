import { FC, ReactNode, useEffect } from 'react'
import Header from './header/Header'
import styles from './Layout.module.scss'

export interface LayoutProps {
	pageTitle: string
	children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children, pageTitle }) => {
	useEffect(() => {
		document.title = pageTitle + ' - IASA.SHOP'
	}, [pageTitle])

	return (
		<div>
			<Header />
			<main className={styles.main}>{children}</main>
			<footer></footer>
		</div>
	)
}

export default Layout
