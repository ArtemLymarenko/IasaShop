import { FC } from 'react'
import { useParams } from 'react-router-dom'
import Catalog from '@/components/ui/catalog/Catalog'
import Layout from '@/components/layout/Layout'
import NotFound from '../not-found/NotFound'
import { useProductBySlug } from '@/hooks/useProducts'

const CategoryPage: FC = () => {
	const { slug } = useParams()
	console.log(slug)
	if (!slug) {
		return <NotFound />
	}
	const { products } = useProductBySlug(slug)

	console.log(products)
	if (!products) {
		return <NotFound />
	}

	return (
		<Layout pageTitle={slug.toUpperCase()}>
			<Catalog products={products} title={slug.toUpperCase()} />
		</Layout>
	)
}

export default CategoryPage
