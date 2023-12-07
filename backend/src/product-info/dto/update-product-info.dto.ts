import { PartialType } from '@nestjs/mapped-types';
import { CreateProductInfoDto } from './create-product-info.dto';

export class UpdateProductInfoDto extends PartialType(CreateProductInfoDto) {}
