import { FC, useState } from 'react'
import Button from '@/components/ui/button/Button'
import Heading from '@/components/ui/heading/Heading'
import styles from './AuthPage.module.scss'
import Field from '@/components/ui/input/Field'
import { useTitle } from '@/hooks/useTitle'

const AuthPage: FC<{ pageTitle: string }> = ({ pageTitle }) => {
	useTitle(pageTitle)
	const [type, setType] = useState<'login' | 'registration'>('login')

	return (
		<div className={styles.authForm}>
			<Heading>{pageTitle}</Heading>
			<form onSubmit={() => {}}>
				<Field placeholder='Email' />
				<Field placeholder='Password' type='password' />
				<Button>Login</Button>
			</form>
		</div>
	)
}

export default AuthPage
