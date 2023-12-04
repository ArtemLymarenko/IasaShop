import { UseGuards, applyDecorators } from '@nestjs/common'
import { TypeRole } from '../auth.interface'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { JwtAdminGuard } from '../guards/admin.guard'

export const Auth = (role: TypeRole = 'user') =>
	applyDecorators(
		role === 'admin'
			? UseGuards(JwtAuthGuard, JwtAdminGuard)
			: UseGuards(JwtAuthGuard)
	)
