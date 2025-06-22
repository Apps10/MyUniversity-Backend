import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PORT } from './shared/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.setGlobalPrefix('api/v1')
  await app.listen(PORT)
}
bootstrap()
