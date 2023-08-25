import { Module } from '@nestjs/common';
import { QueriesService } from './queries.service';
import { QueriesController } from './queries.controller';
import { QueriesRepository } from './queries.repository';
import { DatabaseModule } from 'src/common/database';
import { QueryDocument, QuerySchema } from './schemas/query.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, NOTIFICATIONS_SERVICE } from 'src/common/constants';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: QueryDocument.name, schema: QuerySchema }
    ]),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: NOTIFICATIONS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('NOTIFICATIONS_HOST'),
            port: configService.get('NOTIFICATIONS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [QueriesController],
  providers: [QueriesService, QueriesRepository],
})
export class QueriesModule {}
