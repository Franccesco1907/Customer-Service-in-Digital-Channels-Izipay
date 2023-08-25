import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database';
import { SocialNetworkMessageDocument } from './schemas/messages.schema';

@Injectable()
export class SocialNetworkMessageRepository extends AbstractRepository<SocialNetworkMessageDocument> {
  protected readonly logger = new Logger(SocialNetworkMessageRepository.name);

  constructor(
    @InjectModel(SocialNetworkMessageDocument.name) socialNetworkMessageModel: Model<SocialNetworkMessageDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(socialNetworkMessageModel, connection);
  }

  async deleteMany(filterQuery: FilterQuery<SocialNetworkMessageDocument>): Promise<boolean> {    
    try {
      const result = await this.model.deleteMany(filterQuery);
      console.log('Deleted documents:', result.deletedCount);
      return true;
    } catch (error) {
      this.logger.warn('Error on deleting many messages', filterQuery);
      return false;      
    }
  }

}
