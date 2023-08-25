import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database';
import { ChatBotDocument } from './schemas/chat-bot.schema';

@Injectable()
export class ChatBotRepository extends AbstractRepository<ChatBotDocument> {
  protected readonly logger = new Logger(ChatBotRepository.name);

  constructor(
    @InjectModel(ChatBotDocument.name) chatBotModel: Model<ChatBotDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(chatBotModel, connection);
  }
}
