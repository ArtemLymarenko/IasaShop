import { FC, useState } from 'react'
import styles from './AddCateforyForm.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import Field from '@/components/ui/input/Field'
import categoryService from '@/components/services/category/category.service'
import { ICategoryDto } from '@/components/services/category/category.dto'
import { useQueryClient } from '@tanstack/react-query'

const AddCategoryForm: FC = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const queryClient = useQueryClient()
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ICategoryDto>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<ICategoryDto> = async data => {
		const category = await categoryService.create({
			categoryName: data.categoryName
		})

		if (!category) {
			setErrorMessage('Something went wrong. Try again!')
			return
		}
		await queryClient.invalidateQueries({ queryKey: ['get admin categories'] })
		reset()
	}

	return (
		<div className={styles.formContainer}>
			<p className={styles.errorMessage}>{errorMessage}</p>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field
					{...formRegister('categoryName', {
						required: 'Name is required'
					})}
					placeholder='Name'
					error={errors.categoryName?.message}
				/>

				<button type='submit'>Save</button>
			</form>
		</div>
	)
}
export default AddCategoryForm
