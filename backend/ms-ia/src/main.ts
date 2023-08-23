import { NestFactory } from '@nestjs/core';
import { IaModule } from './ia.module';

async function bootstrap() {
  const app = await NestFactory.create(IaModule);
  await app.listen(3000);
}
bootstrap();
