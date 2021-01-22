import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('/v1/api');

  const consfigService = app.get<ConfigService>(ConfigService);
  const HTTP_PORT = consfigService.get<string>('HTTP_PORT');

  await app.listen(Number(HTTP_PORT) || 3000);
}
bootstrap();
