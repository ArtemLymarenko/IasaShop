import { IAuthResponse, ITokens } from '@/store/user/user.types'
import Cookies from 'js-cookie'

export enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'resfreshToken'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokensToCookies = (data: ITokens) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, data.accessToken)
	Cookies.set(EnumTokens.REFRESH_TOKEN, data.refreshToken)
}
export const removeTokensFromCookies = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
	Cookies.remove(EnumTokens.REFRESH_TOKEN)
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensToCookies(data)
	localStorage.setItem('user', JSON.stringify(data))
}

export const removeFromStorage = () => {
	removeTokensFromCookies()
	localStorage.removeItem('user')
}
