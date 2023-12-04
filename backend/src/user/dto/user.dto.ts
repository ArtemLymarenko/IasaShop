import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	@MinLength(6, {
		message: 'Password must be at least 6 symbols!'
	})
	password: string

	@IsOptional()
	@IsString()
	firstName: string

	@IsOptional()
	@IsString()
	lastName: string

	@IsOptional()
	@IsString()
	phone: string
}
