import { NestFactory } from '@nestjs/core';
import { QueriesModule } from './queries.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(QueriesModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');  
  await app.listen(port).then(() => {
    console.log(`Queries service is running on port ${port}`);
  });
}
bootstrap();
