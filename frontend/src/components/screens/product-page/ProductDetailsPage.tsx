import Layout from '@/components/layout/Layout'
import { FC } from 'react'
import ProductDetails from '@/components/ui/product-details/ProductDetails'
import { useParams } from 'react-router-dom'
import NotFound from '../not-found/NotFound'
import { useProductById } from '@/hooks/useProducts'

const ProductDetailsPage: FC = () => {
	const { id } = useParams()
	if (!id) return <NotFound />

	const { product } = useProductById(id)

	if (!product) return <NotFound />

	return (
		<Layout pageTitle={product.productName}>
			<ProductDetails product={product} />
		</Layout>
	)
}

export default ProductDetailsPage
