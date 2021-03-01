import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('/v1/api');

  const logger = new Logger('main');
  const consfigService = app.get<ConfigService>(ConfigService);
  const PROVIDED_PORT = consfigService.get<string>('PORT');
  const PORT = Number(PROVIDED_PORT) || 3000;

  if (consfigService.get<string>('ENV') === 'development') {
    app.use(morgan('combined'));
  }

  await app.listen(PORT);

  logger.log(`Port provided from command line ${PROVIDED_PORT}...`);
  logger.log(`Application running on port ${PORT}...`);
}
bootstrap();
