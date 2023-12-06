import { IUser } from '@/types/user.interface'
import { instance } from '../../api/api.interceptor'
import { UserDto } from './user.dto.interface'

const USERS = 'users'

class UserService {
	async getProfile() {
		return instance<IUser>({
			url: `${USERS}/profile`,
			method: 'GET'
		})
	}
	async updateProfile(data: UserDto) {
		return instance<IUser>({
			url: `${USERS}/profile`,
			method: 'PUT',
			data
		})
	}
}

export default new UserService()
