import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from 'src/config/jwt.config'
import { JwtStrategy } from './strategy/jwt.strategy'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { UserModule } from 'src/user/user.module'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService, UserService],
	imports: [
		UserModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	]
})
export class AuthModule {}
