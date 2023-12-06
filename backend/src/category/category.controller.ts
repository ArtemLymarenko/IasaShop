import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(){
    return this.categoryService.getAll();
  }


  @Get('by-slug/:slug')
  @Auth()
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.bySlug(slug);
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: string) {
    return this.categoryService.byID(+id);
  }


  @HttpCode(200)
  @Auth()
  @Post()
  async create() {
    return this.categoryService.create();
  }
  
  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') categoryId: string) {
    return this.categoryService.delete(+categoryId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CategoryDto
  ){
    return this.categoryService.update(+id,dto)
  }


}
