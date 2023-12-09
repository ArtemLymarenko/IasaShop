import { getAdminUrl } from '@/config/url.config'
import { IMenuItem } from './IMenuItem'

export const ADMIN_MENU: IMenuItem[] = [
	{
		label: 'Dashboard',
		link: getAdminUrl('/')
	},
	{
		label: 'Products',
		link: getAdminUrl('/products')
	},
	{
		label: 'Categories',
		link: getAdminUrl('/categories')
	},
	{
		label: 'Orders',
		link: getAdminUrl('/orders')
	}
]
