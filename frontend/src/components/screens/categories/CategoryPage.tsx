import { FC } from 'react'
import { useParams } from 'react-router-dom'
import Catalog from '@/components/ui/catalog/Catalog'
import Layout from '@/components/layout/Layout'
import NotFound from '../not-found/NotFound'
import { useProductBySlug } from '@/hooks/query/useProducts'

const CategoryPage: FC = () => {
	const { slug } = useParams()
	if (!slug) {
		return <NotFound />
	}
	const { products } = useProductBySlug(slug)
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
