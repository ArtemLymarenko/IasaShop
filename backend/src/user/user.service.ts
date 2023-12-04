import { BadRequestException, Injectable } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { PrismaService } from 'src/prisma.service'
import { returnUserObject } from './return-user.object'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async getUserById(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = this.prismaService.user.findUnique({
			where: { id },
			select: {
				...returnUserObject,
				...selectObject
			}
		})

		if (!user) throw new Error('User not found')

		return user
	}

	async updateProfile(id: number, userDto: UserDto) {
		const isUserExists = await this.prismaService.user.findUnique({
			where: { email: userDto.email }
		})

		if (isUserExists && id !== isUserExists.id)
			throw new BadRequestException('This email is taken by other user')

		const currentUser = await this.getUserById(id)

		return this.prismaService.user.update({
			where: { id },
			data: {
				email: userDto.email,
				password: userDto.password
					? await hash(userDto.password)
					: currentUser.password,
				userName: currentUser.userName,
				firstName: userDto.firstName,
				lastName: userDto.lastName,
				phone: userDto.phone
			}
		})
	}
}
