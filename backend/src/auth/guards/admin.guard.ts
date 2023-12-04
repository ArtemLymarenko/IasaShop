import {
	CanActivate,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common'
import { User } from '@prisma/client'

export class JwtAdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user
		if (!user.isAdmin) throw new ForbiddenException('Dont have enough right!')
		return true
	}
}
