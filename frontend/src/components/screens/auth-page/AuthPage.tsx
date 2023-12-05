import { FC, useEffect, useState } from 'react'
import Button from '@/components/ui/button/Button'
import Heading from '@/components/ui/heading/Heading'
import styles from './AuthPage.module.scss'
import Field from '@/components/ui/input/Field'

const AuthPage: FC<{ pageTitle: string }> = ({ pageTitle }) => {
	const [type, setType] = useState<'login' | 'registration'>('login')

	useEffect(() => {
		document.title = pageTitle + ' - IASA.SHOP'
	}, [pageTitle])

	return (
		<div className={styles.authForm}>
			<Heading>{pageTitle}</Heading>
			<form onSubmit={() => {}}>
				<Field placeholder='Email' />
				<Field placeholder='Password' isPassword={true} />
				<Button>Login</Button>
			</form>
		</div>
	)
}

export default AuthPage
