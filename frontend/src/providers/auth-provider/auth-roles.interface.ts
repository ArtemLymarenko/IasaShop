import { ReactNode } from 'react'

export type TypeRole = {
	isUser?: boolean
	//isAdmin: boolean
}

export interface AuthRoles {
	role: TypeRole
	children: ReactNode
}
