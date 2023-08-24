import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketsRepository } from './tickets.repository';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: TicketsRepository) {}

  create(createTicketDto: CreateTicketDto) {
    return this.ticketsRepository.create(createTicketDto);
  }

  findAll() {
    return this.ticketsRepository.find({});
  }

  findOne(_id: string) {
    return this.ticketsRepository.findOne({ _id });
  }

  update(_id: string, updateTicketDto: UpdateTicketDto) {
    return this.ticketsRepository.findOneAndUpdate(
      { _id },
      { $set: updateTicketDto },
    )
  }

  remove(_id: string) {
    return this.ticketsRepository.findOneAndDelete({ _id });
  }
}
