import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(
    @Body() createTicketDto: CreateTicketDto
  ) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.ticketsService.findOne(_id);
  }

  @Patch(':id')
  update(@Param('id') _id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(_id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.ticketsService.remove(_id);
  }
}
