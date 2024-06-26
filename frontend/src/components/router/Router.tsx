import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../screens/home/Home'
import CategoryPage from '@/components/screens/categories/CategoryPage'
import NotFound from '../screens/not-found/NotFound'
import ProductDetailsPage from '../screens/product-page/ProductDetailsPage'
import AuthPage from '../screens/auth-page/AuthPage'
import AuthProvider from '@/providers/auth-provider/AuthProvider'
import AdminPanel from '../screens/admin-panel/AdminPanel'
import { getAdminUrl } from '@/config/url.config'
import AdminPanelProducts from '../screens/admin-panel/products/AdminProducts'
import AdminPanelCategories from '../screens/admin-panel/categories/AdminCategories'
import AdminPanelOrders from '../screens/admin-panel/orders/AdminOrders'
import Dashboard from '../screens/admin-panel/dashboard/Dashboard'
import UserPage from '../screens/user-page/UserPage'
import CheckoutPage from '../screens/checkout/CheckoutPage'
import EditProduct from '../screens/admin-panel/products/edit-product/EditProduct'
import Layout from '../layout/Layout'
import EditCategory from '../screens/admin-panel/categories/edit-category/EditCategory'

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
				<Route
					element={<AuthProvider role={{}} children={<AuthPage />} />}
					path='/auth'
				/>

				<Route
					element={
						<AuthProvider
							role={{ isAdmin: true }}
							children={
								<AdminPanel children={<Dashboard />} pageTitle='Dashboard' />
							}
						/>
					}
					path={getAdminUrl()}
				/>
				<Route
					element={
						<AuthProvider
							role={{ isAdmin: true }}
							children={
								<AdminPanel
									children={<AdminPanelProducts />}
									pageTitle='Products'
								/>
							}
						/>
					}
					path={getAdminUrl('/products')}
				/>
				<Route
					element={
						<AuthProvider
							role={{ isAdmin: true }}
							children={
								<AdminPanel
									children={<AdminPanelCategories />}
									pageTitle='Categories'
								/>
							}
						/>
					}
					path={getAdminUrl('/categories')}
				/>
				<Route
					path='/admin-panel/products/edit/:id'
					element={
						<AuthProvider
							role={{ isAdmin: true }}
							children={
								<AdminPanel
									children={<EditProduct />}
									pageTitle='Edit product'
								/>
							}
						/>
					}
				/>
				<Route
					path='/admin-panel/categories/edit/:slug'
					element={
						<AuthProvider
							role={{ isAdmin: true }}
							children={
								<AdminPanel
									children={<EditCategory />}
									pageTitle='Edit category'
								/>
							}
						/>
					}
				/>
				<Route
					element={
						<AuthProvider
							role={{ isAdmin: true }}
							children={
								<AdminPanel
									children={<AdminPanelOrders />}
									pageTitle='Orders'
								/>
							}
						/>
					}
					path={getAdminUrl('/orders')}
				/>
				<Route
					path='/checkout'
					element={
						<AuthProvider role={{ isUser: true }} children={<CheckoutPage />} />
					}
				/>
				<Route
					path='/my-cabinet'
					element={
						<AuthProvider
							role={{ isUser: true }}
							children={<UserPage pageTitle='UserPage' />}
						/>
					}
				/>
				<Route
					path='*'
					element={
						<Layout pageTitle='Not found'>
							<NotFound />
						</Layout>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
