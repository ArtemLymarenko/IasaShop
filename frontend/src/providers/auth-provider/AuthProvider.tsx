import { getAccessToken } from '@/components/services/auth/auth.helper'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthRoles } from './auth-roles.interface'
import CheckRole from './CheckRole'

const AuthProvider: FC<PropsWithChildren<AuthRoles>> = ({ role, children }) => {
	const { user } = useAuth()
	const { logout, checkAuth } = useActions()
	const currentPath = useLocation().pathname

	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = getAccessToken()
		if (!refreshToken && user) logout()
	}, [currentPath])

	return <CheckRole role={role}>{children}</CheckRole>
}

export default AuthProvider
