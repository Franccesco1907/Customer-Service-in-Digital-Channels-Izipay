import { NestFactory } from '@nestjs/core';
import { QueriesModule } from './queries.module';

async function bootstrap() {
  const app = await NestFactory.create(QueriesModule);
  await app.listen(3000);
}
bootstrap();
