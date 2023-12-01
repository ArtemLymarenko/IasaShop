import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
	register() {
		return {
			name: 'Artem',
			age: 19
		}
	}
}
