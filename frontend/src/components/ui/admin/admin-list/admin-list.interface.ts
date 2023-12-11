import { IProductInfo } from '@/types/productInfo.interface'

export interface IListItem {
	id: number
	editUrl?: string
	viewUrl?: string
	items: string[]
	productInfo?: IProductInfo[]
}

export interface IAdminListItem {
	listItem: IListItem
	removeHandler?: () => void
}
