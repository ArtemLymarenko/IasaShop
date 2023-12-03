import { Controller, Get,Put, UsePipes,Body, ValidationPipe, HttpCode, Post, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
// import {Auth} from 'src/auth'  need decorator/ auth

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(){
    return this.categoryService.getAll();
  }
  
  @Get(':id')
  //@Auth()
  async getById(@Param('id') id: string) {
    return this.categoryService.byID(+id);
  }


  @HttpCode(200)
  //@Auth()
  @Post()
  async create() {
    return this.categoryService.create();
  }
  
  @HttpCode(200)
  //@Auth()
  @Delete(':id')
  async delete(@Param('id') categoryId: string) {
    return this.categoryService.delete(+categoryId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  //@Auth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CategoryDto
  ){
    return this.categoryService.update(+id,dto)
  }


}
