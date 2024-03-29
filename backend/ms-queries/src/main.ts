import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  app.use(cookieParser());
  await app.listen(port).then(() => {
    console.log(`Queries service is running on port ${port}`);
  });
}
bootstrap();
