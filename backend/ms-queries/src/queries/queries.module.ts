import { Module } from '@nestjs/common';
import { QueriesService } from './queries.service';
import { QueriesController } from './queries.controller';
import { QueriesRepository } from './queries.repository';
import { DatabaseModule } from 'src/common/database';
import { QueryDocument, QuerySchema } from './schemas/query.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: QueryDocument.name, schema: QuerySchema }
    ]),
  ],
  controllers: [QueriesController],
  providers: [QueriesService, QueriesRepository],
})
export class QueriesModule {}
