import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [AuthModule, ProductModule, CategoryModule],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
