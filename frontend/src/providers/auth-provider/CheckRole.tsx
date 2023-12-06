import { FC, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AuthRoles } from './auth-roles.interface'
import { useLocation, useNavigate } from 'react-router-dom'

const CheckRole: FC<AuthRoles> = ({ role, children }) => {
	const { user } = useAuth()
	const currentPath = useLocation().pathname
	const navigate = useNavigate()

	if (user && role.isUser) {
		return <>{children}</>
	}
	useEffect(() => {
		currentPath !== '/auth' && navigate('/auth')
	})

	return null
}

export default CheckRole
