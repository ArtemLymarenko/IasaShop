import { FC, useState } from 'react'
import Field from '@/components/ui/input/Field'
import styles from './DeliveryForm.module.scss'
import { IOrder } from '@/types/order.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/components/ui/button/Button'

const DeliveryForm: FC = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IOrder>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IOrder> = data => {
		reset()
	}

	return (
		<div className={styles.formContainer}>
			<p>Fill in your personal informaiton</p>
			<p className={styles.errorMessage}>{errorMessage}</p>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field
					{...formRegister('shipCity', {
						required: 'City is required'
					})}
					placeholder='Ship city'
					error={errors.shipCity?.message}
				/>
				<Field
					{...formRegister('shipCountry', {
						required: 'Coutry is required'
					})}
					placeholder='Ship country'
					error={errors.shipCountry?.message}
				/>
				<Field
					{...formRegister('shipRegion', {
						required: 'Region is required'
					})}
					placeholder='Ship region'
					error={errors.shipRegion?.message}
				/>
				<Field
					{...formRegister('shipPostalCode', {
						required: 'Postal code is required',
						pattern: {
							value: /^[0-9]+$/,
							message: 'Postal code must contain only digits'
						}
					})}
					placeholder='Postal Code'
					error={errors.shipPostalCode?.message}
				/>
				<Field
					{...formRegister('shipAdress', {
						required: 'Address is required'
					})}
					placeholder='Your address'
					error={errors.shipAdress?.message}
				/>

				<Button type='submit'>Place order</Button>
			</form>
		</div>
	)
}

export default DeliveryForm
