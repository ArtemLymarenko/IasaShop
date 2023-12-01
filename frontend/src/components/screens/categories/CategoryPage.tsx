import { FC } from 'react'
import { useParams } from 'react-router-dom'
import Catalog from '@/components/ui/catalog/Catalog'
import { products } from '@/data/product.data'
import { categories } from '@/data/categoty.data'
import Layout from '@/components/layout/Layout'
import NotFound from '../not-found/NotFound'

const CategoryPage: FC = () => {
	const { id } = useParams()
	const productsData = products.filter(
		product => product.category.id.toString() === id
	)
	const category = categories.find(item => item.id.toString() === id)

	if (!category) {
		return <NotFound />
	}

	return (
		<Layout pageTitle={category.name}>
			<Catalog products={productsData} title={category.name} />
		</Layout>
	)
}

export default CategoryPage
