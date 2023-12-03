import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { RefreshDto } from './dto/refresh.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService
	) {}

	async getToken(refreshDto: RefreshDto) {
		const token = refreshDto.refreshToken
		const result = await this.jwtService.verifyAsync(token)
		if (!result) throw new UnauthorizedException('Invalid refresh token')

		const user = await this.prismaService.user.findUnique({
			where: { id: result.id }
		})

		return this.returnUserFieldsWithTokens(user.id)
	}

	async login(authDto: AuthDto) {
		const user = await this.validateUser(authDto)
		return this.returnUserFieldsWithTokens(user.id)
	}

	async register(authDto: AuthDto) {
		const oldUser = await this.prismaService.user.findUnique({
			where: { email: authDto.email }
		})

		//Checking if user already exists
		if (oldUser) throw new BadRequestException('This user already exists')

		const user = await this.prismaService.user.create({
			data: {
				email: authDto.email,
				name: faker.person.firstName(),
				phone: faker.phone.number(),
				password: await hash(authDto.password)
			}
		})

		return this.returnUserFieldsWithTokens(user.id)
	}

	//This function generates TWO tokens
	private async issueTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwtService.sign(data, {
			expiresIn: '15m'
		})

		const refreshToken = this.jwtService.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(authDto: AuthDto) {
		const user = await this.prismaService.user.findUnique({
			where: { email: authDto.email }
		})

		//Checking if user already exists
		if (!user) throw new BadRequestException('User not found')

		const isValid = await verify(user.password, authDto.password)

		if (!isValid) throw new UnauthorizedException('Password is not valid')

		return user
	}

	//Returns user data
	private async returnUserFieldsWithTokens(userId: number) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId }
		})

		const tokens = await this.issueTokens(user.id)

		return { user: { id: user.id, email: user.email }, ...tokens }
	}
}
