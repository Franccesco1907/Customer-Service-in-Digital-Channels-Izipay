import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database';
import { QueryDocument } from './schemas/query.schema';

@Injectable()
export class QueriesRepository extends AbstractRepository<QueryDocument> {
  protected readonly logger = new Logger(QueriesRepository.name);

  constructor(
    @InjectModel(QueryDocument.name) queryModel: Model<QueryDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(queryModel, connection);
  }
}
