import { FC, useState } from 'react'
import ProductImage from './product-images/ProductImage'
import styles from './ProductCard.module.scss'
import ProductInformation from './ProductInformation'
import { IProductDetails } from '@/types/product.interface'
import ProductVariations from './product-variations/ProductVariations'
import { useQuery } from '@tanstack/react-query'
import productInfoService from '@/components/services/product-info/productInfo.service'
import { IProductInfo } from '@/types/productInfo.interface'
import NotFound from '@/components/screens/not-found/NotFound'

const ProductCard: FC<IProductDetails> = ({ product }) => {
	const { data } = useQuery({
		queryKey: ['get sizes'],
		queryFn: () => productInfoService.getById(product.id),
		select: ({ data }) => data
	})

	if (!data) return <NotFound />

	const [selectedSize, setSelectedSize] = useState<IProductInfo>(data[0])

	return (
		<div className={styles.card}>
			<ProductImage product={product} />
			<div className={styles.information}>
				<ProductInformation product={product} />
				<ProductVariations
					product={product}
					sizes={data}
					selectedSize={selectedSize}
					setSelectedSize={setSelectedSize}
				/>
			</div>
		</div>
	)
}

export default ProductCard
