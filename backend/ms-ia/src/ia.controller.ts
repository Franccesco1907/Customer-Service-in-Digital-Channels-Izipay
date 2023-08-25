import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IaService } from './ia.service';
import { CreateIaDto } from './dto/create-ia.dto';
import { UpdateIaDto } from './dto/update-ia.dto';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post()
  create(@Body() createIaDto: CreateIaDto) {
    return this.iaService.processInput(createIaDto.message);
  }
}
