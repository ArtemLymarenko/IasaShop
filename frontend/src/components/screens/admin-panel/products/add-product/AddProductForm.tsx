import { FC, useState } from 'react'
import styles from './AddProductForm.module.scss'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import Field from '@/components/ui/input/Field'
import productService from '@/components/services/product/product.service'
import productInfoService from '@/components/services/product-info/product-info.service'
import categoryService from '@/components/services/category/category.service'
import { useQueryClient } from '@tanstack/react-query'

interface ISizeDto {
	sizeName: string
	amountStorage: number
	productId: number
}

interface IImage {
	image: string
}

interface IProductForm {
	productName: string
	price: number
	description: string
	categoryName: string
	images: IImage[]
	size: ISizeDto[]
}

const AddProductForm: FC = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const queryClient = useQueryClient()
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm<IProductForm>({
		mode: 'onChange',
		defaultValues: {
			images: [],
			size: []
		}
	})

	const {
		fields: imageFields,
		append: appendImage,
		remove: removeImage
	} = useFieldArray({
		control,
		name: 'images'
	})

	const {
		fields: sizeFields,
		append: appendSize,
		remove: removeSize
	} = useFieldArray({
		control,
		name: 'size'
	})

	const onSubmit: SubmitHandler<IProductForm> = async data => {
		try {
			const category = await categoryService.getBySlug(
				data.categoryName.toLocaleLowerCase()
			)

			if (!category) {
				throw new Error('Category not found')
			}
			const imagesString = data.images.map(image => image.image)
			const product = await productService.create({
				productName: data.productName,
				price: parseFloat(data.price.toString()),
				description: data.description,
				images: imagesString,
				categoryId: category.data.id
			})
			await Promise.all(
				data.size.map(async size => {
					await productInfoService.create({
						productId: product.id,
						amountStorage: parseInt(size.amountStorage.toString()),
						sizeName: size.sizeName
					})
				})
			)
		} catch (error) {
			setErrorMessage(`Something went wrong. Try again!`)
		}
		await queryClient.invalidateQueries('get admin products')
		reset()
	}

	return (
		<div className={styles.formContainer}>
			<p className={styles.errorMessage}>{errorMessage}</p>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div>
					<Field
						{...formRegister('productName', {
							required: 'Name is required'
						})}
						placeholder='Name'
						error={errors.productName?.message}
					/>
					<Field
						{...formRegister('price', {
							required: 'Price is required',
							pattern: {
								value: /^\d+(\.\d{1,2})?$/,
								message: 'Invalid price format'
							}
						})}
						placeholder='Price'
						error={errors.price?.message}
					/>
					<Field
						{...formRegister('description', {
							required: 'Description is required'
						})}
						placeholder='Description'
						error={errors.description?.message}
					/>

					<Field
						{...formRegister('categoryName', {
							required: 'Category name is required'
						})}
						placeholder='Category name'
						error={errors.description?.message}
					/>
				</div>
				<div>
					{imageFields.map((field, index) => (
						<div key={field.id}>
							<div>
								<Field
									{...formRegister(`images.${index}.image`, {
										required: 'Photo is required'
									})}
									placeholder={`Photo ${index + 1}`}
									error={errors.images?.message}
								/>

								<button
									className={styles.delete}
									type='button'
									onClick={() => removeImage(index)}
								>
									Delete photo
								</button>
							</div>
						</div>
					))}
					<button type='button' onClick={() => appendImage({ image: '' })}>
						Add photo
					</button>
				</div>

				<div>
					{sizeFields.map((field, index) => (
						<div key={field.id}>
							<div className={styles.size}>
								<Field
									{...formRegister(`size.${index}.sizeName`, {
										required: 'Size is required'
									})}
									placeholder='Size name'
									error={errors.size?.message}
								/>
								<Field
									{...formRegister(`size.${index}.amountStorage`, {
										required: 'Quantity is required',
										pattern: {
											value: /^[0-9]+$/,
											message: 'Please enter a valid whole number.'
										}
									})}
									placeholder='Quantity'
									error={errors.size?.message}
								/>
							</div>
							<button
								className={styles.delete}
								type='button'
								onClick={() => removeSize(index)}
							>
								Delete size
							</button>
						</div>
					))}
					<button
						type='button'
						onClick={() =>
							appendSize({ sizeName: '', amountStorage: 0, productId: 0 })
						}
					>
						Add size
					</button>
				</div>

				<button type='submit'>Save</button>
			</form>
		</div>
	)
}
export default AddProductForm
