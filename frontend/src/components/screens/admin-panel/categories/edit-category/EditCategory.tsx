import { FC, useState } from 'react'
import styles from './EditCategory.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import Field from '@/components/ui/input/Field'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import categoryService from '@/components/services/category/category.service'
import NotFound from '@/components/screens/not-found/NotFound'
import Button from '@/components/ui/button/Button'

const EditCategory: FC = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [errorMessage, setErrorMessage] = useState('')
	const { slug } = useParams()
	if (!slug) return <NotFound />

	const { data: category, error } = useQuery({
		queryKey: ['category by slug', slug],
		queryFn: () => categoryService.getBySlug(slug),
		select: ({ data }) => data
	})

	if (error) {
		navigate('/admin-panel/categories')
	}

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors }
	} = useForm<{ categoryName: string }>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<{ categoryName: string }> = async data => {
		try {
			await categoryService.update(category?.id, {
				categoryName: data.categoryName
			})
		} catch (error) {
			setErrorMessage(`Something went wrong. Try again!`)
		}
		await queryClient.invalidateQueries({ queryKey: ['category by slug'] })
		navigate('/admin-panel/categories')
	}

	return (
		<div className={styles.formContainer}>
			<p className={styles.errorMessage}>{errorMessage}</p>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field
					{...formRegister('categoryName')}
					defaultValue={category?.categoryName}
					placeholder='Name'
					error={errors.categoryName?.message}
				/>
				<Button type='submit'>Save</Button>
			</form>
		</div>
	)
}

export default EditCategory
