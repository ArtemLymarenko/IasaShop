import { IUser } from '@/types/user.interface'

export interface IUserState {
	email: string
	isAdmin: boolean
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface IEmailPassword {
	email: string
	password: string
	repeatPassword?: string
}

export interface IAuthResponse extends ITokens {
	user: IUser & {
		isAdmin: boolean
	}
}
