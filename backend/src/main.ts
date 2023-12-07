import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableShutdownHooks()

	app.setGlobalPrefix('api')
	app.enableCors({
		origin: [
			'http://127.0.0.1:5173',
			'http://127.0.0.1:5000',
			'http://localhost:5173',
			'http://localhost:5000',
			'http://client:5000',
			'http://client'
		],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true
	})

	await app.listen(4200)
}
bootstrap()
