import { Injectable } from '@nestjs/common';
import { CreateProductInfoDto } from './dto/create-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';

@Injectable()
export class ProductInfoService {
  create(createProductInfoDto: CreateProductInfoDto) {
    return 'This action adds a new productInfo';
  }

  findAll() {
    return `This action returns all productInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productInfo`;
  }

  update(id: number, updateProductInfoDto: UpdateProductInfoDto) {
    return `This action updates a #${id} productInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} productInfo`;
  }
}
