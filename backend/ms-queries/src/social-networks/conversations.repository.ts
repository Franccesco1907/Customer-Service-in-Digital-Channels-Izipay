import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model } from 'mongoose';
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

  async findOne(filterQuery: FilterQuery<SocialNetworkConversationsDocument>): Promise<SocialNetworkConversationsDocument | null>{
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      return null;
    }

    return document as SocialNetworkConversationsDocument;
  }
}
