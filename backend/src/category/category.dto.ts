import { IsString } from 'class-validator'

export class CategoryDto {
	@IsString()
	categoryName: string
}
