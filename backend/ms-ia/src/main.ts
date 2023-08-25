import { NestFactory } from '@nestjs/core';
import { IaModule } from './ia.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(IaModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');  
  await app.listen(port).then(() => {
    console.log(`IA service is running on port ${port}`);
  });
}
bootstrap();
