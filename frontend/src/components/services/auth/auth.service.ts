import axios from 'axios'
import { EnumTokens, saveToStorage } from './auth.helper'
import Cookies from 'js-cookie'
import { IAuthResponse, IEmailPassword } from '@/store/user/user.types'
import { getContentType } from '@/components/api/api.helper'
import { instance } from '@/components/api/api.interceptor'

class AuthService {
	async authMain(type: 'login' | 'register', data: IEmailPassword) {
		const response = await instance<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	}

	async getNewTokens() {
		const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)

		const response = await axios.post<string, { data: IAuthResponse }>(
			import.meta.env.VITE_SERVER_URL + '/auth/login/access-tokens',
			{ refreshToken },
			{ headers: getContentType() }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	}
}

export default new AuthService()
