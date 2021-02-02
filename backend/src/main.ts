import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('/v1/api');

  const logger = new Logger('main');
  const consfigService = app.get<ConfigService>(ConfigService);
  const PROVIDED_PORT = consfigService.get<string>('PORT');
  const PORT = Number(PROVIDED_PORT) || 3000;

  await app.listen(PORT);

  logger.log(`Port provided from command line ${PROVIDED_PORT}...`);
  logger.log(`Application running on port ${PORT}...`);
}
bootstrap();