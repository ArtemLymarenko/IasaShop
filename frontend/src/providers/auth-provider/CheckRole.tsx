import { FC, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AuthRoles } from './auth-roles.interface'
import { useLocation, useNavigate } from 'react-router-dom'
import NotFound from '@/components/screens/not-found/NotFound'

const CheckRole: FC<AuthRoles> = ({ role, children }) => {
	const { user } = useAuth()
	const currentPath = useLocation().pathname
	const navigate = useNavigate()

	if (!role.isUser && !role.isAdmin) return <>{children}</>
	if (user?.isAdmin) return <>{children}</>
	if (user && role.isUser) return <>{children}</>
	if (user && role.isAdmin) return <NotFound />

	useEffect(() => {
		currentPath !== '/auth' && navigate('/auth')
	})

	return null
}

export default CheckRole
