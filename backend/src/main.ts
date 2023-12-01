import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableShutdownHooks()

	app.setGlobalPrefix('api')
	app.enableCors()

	await app.listen(4200)
}
bootstrap()
