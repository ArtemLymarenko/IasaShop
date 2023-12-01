import Layout from '@/components/layout/Layout'
import { products } from '@/data/product.data'
import { FC } from 'react'
import ProductDetails from '@/components/ui/product-details/ProductDetails'
import { useParams } from 'react-router-dom'
import NotFound from '../not-found/NotFound'

const ProductDetailsPage: FC = () => {
	const { id } = useParams()
	const product = products.find(product => product.id.toString() === id)

	if (!product) {
		return <NotFound />
	}

	return (
		<Layout pageTitle={product.name}>
			<ProductDetails product={product} />
		</Layout>
	)
}

export default ProductDetailsPage
