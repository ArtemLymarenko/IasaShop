import Catalog from '@/components/ui/catalog/Catalog'
import { FC } from 'react'
//import { products } from '@/data/product.data'
import Layout from '@/components/layout/Layout'
import { useProducts } from '@/hooks/useProducts'
import NotFound from '../not-found/NotFound'

const Home: FC = () => {
	const { products } = useProducts()

	if (!products) {
		return <NotFound />
	}

	return (
		<Layout pageTitle='Home'>
			<Catalog products={products} title={'Home'} />
		</Layout>
	)
}

export default Home
