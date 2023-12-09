import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService,PrismaService],
})
export class OrderItemModule {}
