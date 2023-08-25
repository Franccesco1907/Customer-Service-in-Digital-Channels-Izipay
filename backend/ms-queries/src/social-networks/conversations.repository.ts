import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database';
import { SocialNetworkConversationsDocument } from './schemas/conversations.schema';

@Injectable()
export class SocialNetworkConversationsRepository extends AbstractRepository<SocialNetworkConversationsDocument> {
  protected readonly logger = new Logger(SocialNetworkConversationsRepository.name);

  constructor(
    @InjectModel(SocialNetworkConversationsDocument.name) socialNetworkMessageModel: Model<SocialNetworkConversationsDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(socialNetworkMessageModel, connection);
  }
}
