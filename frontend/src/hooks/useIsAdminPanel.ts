import { ADMIN_PANEL } from '@/config/url.config'
import { useLocation } from 'react-router-dom'

export const useIsAdminPanel = (): { isAdminPanel: boolean; path: string } => {
	const currentPath = useLocation().pathname
	if (currentPath.includes(ADMIN_PANEL))
		return { isAdminPanel: true, path: currentPath }
	return { isAdminPanel: false, path: currentPath }
}
