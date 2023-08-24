import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database';
import { TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketsRepository extends AbstractRepository<TicketDocument> {
  protected readonly logger = new Logger(TicketsRepository.name);

  constructor(
    @InjectModel(TicketDocument.name) ticketModel: Model<TicketDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(ticketModel, connection);
  }
}
