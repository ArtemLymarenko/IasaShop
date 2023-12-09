import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../screens/home/Home'
import CategoryPage from '@/components/screens/categories/CategoryPage'
import NotFound from '../screens/not-found/NotFound'
import ProductDetailsPage from '../screens/product-page/ProductDetailsPage'
import AuthPage from '../screens/auth-page/AuthPage'
import AuthProvider from '@/providers/auth-provider/AuthProvider'
import AdminPanel from '../screens/admin-panel/AdminPanel'
import { getAdminUrl } from '@/config/url.config'
import AdminPanelProducts from '../screens/admin-panel/products/AdminPanelProducts'
import AdminPanelCategories from '../screens/admin-panel/categories/AdminPanelCategories'
import AdminPanelOrders from '../screens/admin-panel/orders/AdminPanelOrders'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={<AuthProvider role={{}} children={<Home />} />}
					path='/'
				/>
				<Route
					element={<AuthProvider role={{}} children={<CategoryPage />} />}
					path='/categories/:slug'
				/>
				<Route
					element={<AuthProvider role={{}} children={<ProductDetailsPage />} />}
					path='/products/:id'
				/>
				<Route element={<AuthPage />} path='/auth' />
				<Route
					element={
						<AuthProvider
							role={{ isUser: true }}
							children={<div>User cabinet</div>}
						/>
					}
					path='/my-cabinet'
				/>
				<Route
					element={
						<AuthProvider role={{ isAdmin: true }} children={<AdminPanel />} />
					}
					path={getAdminUrl()}
				/>
				<Route
					element={
						<AuthProvider
							role={{ isAdmin: true }}
							children={<AdminPanelProducts />}
						/>
					}
					path={getAdminUrl('/products')}
				/>
				<Route
					element={
						<AuthProvider
							role={{ isAdmin: true }}
							children={<AdminPanelCategories />}
						/>
					}
					path={getAdminUrl('/categories')}
				/>
				<Route
					element={
						<AuthProvider
							role={{ isAdmin: true }}
							children={<AdminPanelOrders />}
						/>
					}
					path={getAdminUrl('/orders')}
				/>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
