import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshDto } from './dto/refresh.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(@Body() authDto: AuthDto) {
		return this.authService.register(authDto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() authDto: AuthDto) {
		return this.authService.login(authDto)
	}

	@HttpCode(200)
	@Post('login/access-tokens')
	async accessTokens(@Body() refreshDto: RefreshDto) {
		return this.authService.getToken(refreshDto)
	}
}
