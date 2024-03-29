import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UserDocument.name) userModel: Model<UserDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(userModel, connection);
  }
}
