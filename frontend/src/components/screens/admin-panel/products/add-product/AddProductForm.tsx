import { FC } from 'react'
import styles from './AddProductForm.module.scss'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import Field from '@/components/ui/input/Field'

interface ISizeDto {
	sizeName: string
	amountStorage: number
	productId: number
}

interface IImage {
	image: string
}

interface IProductDto {
	productName: string
	price: number
	description: string
	categoryName: string
	images: IImage[]
	size: ISizeDto[]
}

const AddProductForm: FC = () => {
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm<IProductDto>({
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

	const onSubmit: SubmitHandler<IProductDto> = data => {
		reset()
	}

	return (
		<div className={styles.formContainer}>
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
							required: 'Price is required'
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
										required: 'Quantity is required'
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

				<button type='submit'>Зберегти</button>
			</form>
		</div>
	)
}
export default AddProductForm