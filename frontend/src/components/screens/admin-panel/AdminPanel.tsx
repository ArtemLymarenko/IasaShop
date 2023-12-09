import { FC, PropsWithChildren, ReactNode } from 'react'
import Layout, { LayoutProps } from '@/components/layout/Layout'
import Heading from '@/components/ui/heading/Heading'
import styles from './AdminPanel.module.scss'

const AdminPanel: FC<LayoutProps> = ({ children, pageTitle }) => {
	return (
		<Layout pageTitle={`Admin/${pageTitle}`}>
			<section className={styles.content}>
				<Heading>{pageTitle}</Heading>
				{children}
			</section>
		</Layout>
	)
}

export default AdminPanel
