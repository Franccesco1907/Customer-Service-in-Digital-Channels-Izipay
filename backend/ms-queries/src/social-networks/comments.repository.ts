import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database';
import { SocialNetworkCommentDocument } from './schemas/comments.schema';

@Injectable()
export class SocialNetworkCommentRepository extends AbstractRepository<SocialNetworkCommentDocument> {
  protected readonly logger = new Logger(SocialNetworkCommentRepository.name);

  constructor(
    @InjectModel(SocialNetworkCommentDocument.name) socialNetworkCommentModel: Model<SocialNetworkCommentDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(socialNetworkCommentModel, connection);
  }
}
