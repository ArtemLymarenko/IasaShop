import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../screens/home/Home'
import CategoryPage from '@/components/screens/categories/CategoryPage'
import NotFound from '../screens/not-found/NotFound'
import ProductDetailsPage from '../screens/product-page/ProductDetailsPage'
import AuthPage from '../screens/auth-page/AuthPage'
//import AuthProvider from '@/providers/auth-provider/AuthProvider'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					// <AuthProvider role={{ isUser: true }} children={<Home />}
					element={<Home />}
					path='/'
				></Route>
				<Route element={<CategoryPage />} path='/categories/:slug'></Route>
				<Route element={<ProductDetailsPage />} path='/products/:id'></Route>
				<Route element={<AuthPage />} path='/auth'></Route>
				<Route path='*' element={<NotFound />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
