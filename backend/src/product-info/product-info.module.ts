import { Module } from '@nestjs/common';
import { ProductInfoService } from './product-info.service';
import { ProductInfoController } from './product-info.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductInfoController],
  providers: [ProductInfoService,PrismaService],
})
export class ProductInfoModule {}
