import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../screens/home/Home'
import CategoryPage from '@/components/screens/categories/CategoryPage'
import NotFound from '../screens/not-found/NotFound'
import ProductDetailsPage from '../screens/product-page/ProductDetailsPage'
import AuthPage from '../screens/auth-page/AuthPage'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Home />} path='/'></Route>
				<Route element={<CategoryPage />} path='/category/:id'></Route>
				<Route element={<ProductDetailsPage />} path='/products/:id'></Route>
				<Route
					element={<AuthPage pageTitle='Authorization' />}
					path='/auth'
				></Route>
				<Route path='*' element={<NotFound />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
