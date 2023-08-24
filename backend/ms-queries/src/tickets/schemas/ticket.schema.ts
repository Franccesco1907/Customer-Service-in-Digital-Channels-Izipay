import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database';

@Schema({ versionKey: false })
export class TicketDocument extends AbstractDocument {
  @Prop()
  documentNumber: string;

  @Prop()
  code: string;

  @Prop()
  query: string;

  @Prop()
  priority: string;

  @Prop()
  state: string;

  @Prop()
  isClosedByIa: boolean;

  @Prop()
  solution: string;

  @Prop()
  responsible: string;
}

export const TicketSchema = SchemaFactory.createForClass(TicketDocument);
