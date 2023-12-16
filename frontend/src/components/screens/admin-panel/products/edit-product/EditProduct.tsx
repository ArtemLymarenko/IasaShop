import { FC, useState } from 'react'
import styles from './EditProduct.module.scss'
import Field from '@/components/ui/input/Field'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import NotFound from '@/components/screens/not-found/NotFound'
import productService from '@/components/services/product/product.service'
import productInfoService from '@/components/services/product-info/product-info.service'
import { IProduct } from '@/types/product.interface'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Button from '@/components/ui/button/Button'

const EditProduct: FC = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { id } = useParams()
	if (!id) {
		return <NotFound />
	}
	const { data: product, error } = useQuery({
		queryKey: ['product by id', id],
		queryFn: () => productService.getById(id),
		select: ({ data }) => data
	})

	if (error) {
		navigate('/admin-panel/products')
	}

	const [errorMessage, setErrorMessage] = useState('')

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors }
	} = useForm<IProduct>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IProduct> = async data => {
		try {
			const productToSend = await productService.update(id, {
				productName: data.productName,
				price: parseFloat(data.price.toString()),
				description: data.description,
				images: data.images,
				categoryId: +product?.category.id
			})

			const { data: productInfos } = await productInfoService.getById(id)
			if (!productInfos) {
				throw new Error('Product sizes not found')
			}

			await Promise.all(
				productInfos.map(async (size, index) => {
					await productInfoService.update(size.id, {
						productId: productToSend.data.id,
						amountStorage: +data.productInfo[index].amountStorage,
						sizeName: data.productInfo[index].sizeName
					})
				})
			)
		} catch (error) {
			setErrorMessage(`Something went wrong. Try again!`)
		}
		await queryClient.invalidateQueries({ queryKey: ['product by id'] })
		navigate('/admin-panel/products')
	}

	return (
		<div className={styles.formContainer}>
			<p className={styles.errorMessage}>{errorMessage}</p>
			{product && (
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div>
						<Field
							{...formRegister('productName')}
							defaultValue={product?.productName}
							placeholder='Name'
							error={errors.productName?.message}
						/>
						<Field
							{...formRegister('price', {
								pattern: {
									value: /^\d+(\.\d{1,2})?$/,
									message: 'Invalid price format'
								}
							})}
							defaultValue={product?.price}
							placeholder='Price'
							error={errors.price?.message}
						/>
						<Field
							{...formRegister('description')}
							defaultValue={product?.description}
							placeholder='Description'
							error={errors.description?.message}
						/>
					</div>
					<div>
						{product?.images.map((field, index) => (
							<div key={index}>
								<div>
									<Field
										{...formRegister(`images.${index}`)}
										placeholder={`Photo ${index + 1}`}
										defaultValue={field}
										error={errors.images?.message}
									/>
								</div>
							</div>
						))}
					</div>

					<div>
						{product?.productInfo.map((field, index) => (
							<div key={index}>
								<div className={styles.size}>
									<Field
										{...formRegister(`productInfo.${index}.sizeName`)}
										defaultValue={field.sizeName}
										placeholder='Size name'
										error={errors.productInfo?.message}
									/>
									<Field
										{...formRegister(`productInfo.${index}.amountStorage`, {
											pattern: {
												value: /^[0-9]+$/,
												message: 'Please enter a valid whole number.'
											}
										})}
										defaultValue={field.amountStorage}
										placeholder='Quantity'
										error={errors.productInfo?.message}
									/>
								</div>
							</div>
						))}
					</div>

					<Button type='submit'>Save</Button>
				</form>
			)}
		</div>
	)
}

export default EditProduct
