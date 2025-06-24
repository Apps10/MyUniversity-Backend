import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PORT } from './shared/config'
import { ValidationPipe } from '@nestjs/common'
import { DomainExceptionHandler } from './infraestructure/api/exceptionHandlers/domainExceptionHandler'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.enableCors({
    origin: '*',
  })
  app.setGlobalPrefix('api/v1')

  app.useGlobalFilters(new DomainExceptionHandler())

  await app.listen(PORT)
}
bootstrap()
