import { Inject, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketsRepository } from './tickets.repository';
import { NOTIFICATIONS_SERVICE } from 'src/common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: TicketsRepository,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
    ) {}

  async create(createTicketDto: CreateTicketDto) {
    this.notificationsService.emit('notify_email', {
      email: createTicketDto.email,
      text: `Se creó el ticket, por favor revisarlo.`,
    });
    const lastTicket = await this.ticketsRepository.getLastTicket();
    const newCode = lastTicket && lastTicket.code ? lastTicket.code + 1 : 1;
    return this.ticketsRepository.create({
      ...createTicketDto,
      code: newCode,
      state: 'PENDIENTE',
      solution: '',
    });
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
