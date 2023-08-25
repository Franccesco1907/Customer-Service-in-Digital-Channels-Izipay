import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { IaService } from './ia.service';
import { CreateIaDto } from './dto/create-ia.dto';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createIaDto: CreateIaDto) {
    return this.iaService.processInput(createIaDto.message);
  }
}
