import { Injectable } from '@nestjs/common';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { QueriesRepository } from './queries.repository';

@Injectable()
export class QueriesService {
  constructor(private readonly queriesRepository: QueriesRepository) {}

  create(createQueryDto: CreateQueryDto) {
    return this.queriesRepository.create(createQueryDto);
  }

  findAll() {
    return this.queriesRepository.find({});
  }

  findOne(_id: string) {
    return this.queriesRepository.findOne({ _id });
  }

  update(_id: string, updateQueryDto: UpdateQueryDto) {
    return this.queriesRepository.findOneAndUpdate(
      { _id },
      { $set: updateQueryDto },
    )
  }

  remove(_id: string) {
    return this.queriesRepository.findOneAndDelete({ _id });
  }
}