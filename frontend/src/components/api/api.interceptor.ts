import axios from 'axios'
import { errorCatch, getContentType } from './api.helper'
import { getAccessToken, removeFromStorage } from '../services/auth/auth.helper'
import authService from '../services/auth/auth.service'

export enum ErrorJwtTypes {
	JWT_EXPIRED = 'jwt expired',
	JWT_MUST_PROVIDED = 'jwt must be provided'
}

export const instance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
	headers: getContentType()
})

instance.interceptors.request.use(config => {
	const accessToken = getAccessToken()
	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalConfig = error.config

		if (
			error.response.status === 401 ||
			errorCatch(error) === ErrorJwtTypes.JWT_EXPIRED ||
			(errorCatch(error) === ErrorJwtTypes.JWT_MUST_PROVIDED &&
				error.config &&
				!originalConfig._retry)
		) {
			originalConfig._retry = true

			try {
				await authService.getNewTokens()
				return instance(originalConfig)
			} catch (error) {
				if (errorCatch(error) === ErrorJwtTypes.JWT_EXPIRED) {
					removeFromStorage()
				}
			}
		}

		throw error
	}
)
