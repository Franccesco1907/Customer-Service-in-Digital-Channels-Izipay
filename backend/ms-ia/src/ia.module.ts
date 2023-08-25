import { Module } from '@nestjs/common';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter, LoggingInterceptor, TimeOutInterceptor } from './common';
import * as Joi from 'joi';

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
  ],
  controllers: [IaController],
  providers: [
    IaService,
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
