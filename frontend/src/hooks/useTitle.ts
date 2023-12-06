import { useEffect } from 'react'

export const useTitle = (pageTitle: string) => {
	useEffect(() => {
		document.title = pageTitle + ' - IASA.SHOP'
	}, [pageTitle])
}
