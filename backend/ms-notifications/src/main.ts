import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');  
  await app.listen(port).then(() => {
    console.log(`Notifications service is running on port ${port}`);
  });
}
bootstrap();
