import { Module } from '@nestjs/common';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './common/database';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter, LoggingInterceptor, TimeOutInterceptor } from './common';
import * as Joi from 'joi';
import { ChatBotRepository } from './chat-bot.repository';
import { ChatBotDocument, ChatBotSchema } from './schemas/chat-bot.schema';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATIONS_SERVICE, QUERIES_SERVICE, SOCIALNETWORK_SERVICE } from './common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
        API_KEY_GPT: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ChatBotDocument.name, schema: ChatBotSchema },
    ]),
    HttpModule,
    ClientsModule.registerAsync([      
      {
        name: SOCIALNETWORK_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('SOCIALNETWORK_HOST'),
            port: configService.get('SOCIALNETWORK_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [IaController],
  providers: [
    IaService,
    ChatBotRepository,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeOutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class IaModule {}
