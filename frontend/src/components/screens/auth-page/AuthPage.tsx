import { FC, useState } from 'react'
import Button from '@/components/ui/button/Button'
import Heading from '@/components/ui/heading/Heading'
import styles from './AuthPage.module.scss'
import Field from '@/components/ui/input/Field'
import { useTitle } from '@/hooks/useTitle'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IEmailPassword } from '@/store/user/user.types'
import { validateEmail } from './valid-email'
import { useAuthRedirect } from './useAuthRedirect'

const AuthPage: FC = () => {
	const { isLoading } = useAuth()
	const { login, register } = useActions()
	const [type, setType] = useState<'Login' | 'Register'>('Login')

	useAuthRedirect()

	useTitle(type)
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
		watch
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IEmailPassword> = data => {
		const dataToSend = { email: data.email, password: data.password }
		if (type === 'Login') login(dataToSend)
		else register(dataToSend)

		reset()
	}

	const password = watch('password', '')
	return (
		<section className={styles.authForm}>
			<Heading>{type} Page</Heading>
			{isLoading ? 'Loading...' : ''}
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					{...formRegister('email', {
						required: 'Email is required',
						pattern: {
							value: validateEmail,
							message: 'Input valid email'
						}
					})}
					placeholder='Email'
					error={errors.email?.message}
				/>
				<Field
					placeholder='Password'
					type='password'
					{...formRegister('password', {
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 symbols'
						}
					})}
					error={errors.password?.message}
				/>
				{type === 'Register' && (
					<Field
						placeholder='Repeat your password'
						type='password'
						{...formRegister('repeatPassword', {
							required: 'Repeat password is required',
							validate: value => value === password || 'Passwords do not match'
						})}
						error={errors.repeatPassword?.message}
					/>
				)}
				<div className={styles.formButtons}>
					<Button>{type}</Button>
					<span>OR</span>
					<button
						className={styles.registerOrLogin}
						onClick={() => setType(type === 'Login' ? 'Register' : 'Login')}
					>
						{type === 'Login' ? 'Register' : 'Login'}
					</button>
				</div>
			</form>
		</section>
	)
}

export default AuthPage
