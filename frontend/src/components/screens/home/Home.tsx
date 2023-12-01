import Catalog from '@/components/ui/catalog/Catalog'
import { FC } from 'react'
import { products } from '@/data/product.data'
import Layout from '@/components/layout/Layout'

const Home: FC = () => {
	return (
		<Layout pageTitle='Home'>
			<Catalog products={products} title={'Home'} />
		</Layout>
	)
}

export default Home
