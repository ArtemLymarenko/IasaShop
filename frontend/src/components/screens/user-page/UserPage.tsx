import { FC, useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Layout from '@/components/layout/Layout'
import styles from './UserPage.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import Field from '@/components/ui/input/Field'
import { IUser } from '@/types/user.interface'
import userService from '@/components/services/user/user.service'
import { useGetProfile } from '@/hooks/useGetProfile'
import { useActions } from '@/hooks/useActions'
import Heading from '@/components/ui/heading/Heading'
import Button from '@/components/ui/button/Button'

const LeftSection: FC<{ onButtonClick: (button: string) => void }> = ({
	onButtonClick
}) => {
	const { logout } = useActions()
	return (
		<div className={styles.leftSection}>
			<div className={styles.textBlock}>
				<div
					className={styles.leftSectionText}
					onClick={() => onButtonClick('account')}
				>
					Personal Account
				</div>
				<div
					className={styles.leftSectionText}
					onClick={() => onButtonClick('orders')}
				>
					My Orders
				</div>
			</div>
			<button className={styles.logButton} onClick={logout}>
				Logout
			</button>
		</div>
	)
}

const UserPage: FC<{ pageTitle: string }> = ({ pageTitle }) => {
	const queryClient = useQueryClient()
	const userProfile = useGetProfile()

	const [, setErrorMessage] = useState('')
	const [selectedButton, setSelectedButton] = useState<string>('account') // Default to 'account'

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
		setValue
	} = useForm<IUser>({
		mode: 'onChange',
		defaultValues: userProfile
	})

	useEffect(() => {
		setValue('firstName', userProfile?.firstName || '')
		setValue('lastName', userProfile?.lastName || '')
		setValue('phone', userProfile?.phone || '')
		setValue('email', userProfile?.email || '')
	}, [userProfile, setValue])

	const onSubmit: SubmitHandler<IUser> = async data => {
		console.log('Submitting data:', data)
		const user = await userService.updateProfile({
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phone
		})

		if (!user) {
			setErrorMessage('Something went wrong. Try again!')
			return
		}

		queryClient.invalidateQueries({ queryKey: ['profile data'] })

		reset()
	}

	const renderRightSection = () => {
		switch (selectedButton.toLowerCase()) {
			case 'account':
				return (
					<>
						<Heading>My Account</Heading>
						<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
							<Field
								{...formRegister('firstName', {
									required: 'First name is required'
								})}
								placeholder='First Name'
								error={errors.firstName?.message}
							/>

							<Field
								{...formRegister('lastName', {
									required: 'Last name is required'
								})}
								placeholder='Last Name'
								error={errors.lastName?.message}
							/>

							<Field
								{...formRegister('phone', {
									required: 'Phone number is required'
								})}
								placeholder='Phone'
								error={errors.phone?.message}
							/>

							<Field
								{...formRegister('email', {
									required: 'Email is required'
								})}
								placeholder='Email'
								error={errors.email?.message}
							/>
							<Button type='submit' className={styles.submitButton}>
								Save
							</Button>
						</form>
					</>
				)
			case 'orders':
				return (
					<>
						<Heading>My Orders</Heading>
					</>
				)
			default:
				return null
		}
	}

	return (
		<Layout pageTitle={pageTitle}>
			<div className={styles.pageContainer}>
				<LeftSection onButtonClick={button => setSelectedButton(button)} />

				<div className={styles.rightSection}>
					<div className={styles.rightContent}>{renderRightSection()}</div>
				</div>
			</div>
		</Layout>
	)
}

export default UserPage
