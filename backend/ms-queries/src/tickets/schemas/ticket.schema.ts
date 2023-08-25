import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database';

@Schema({ versionKey: false })
export class TicketDocument extends AbstractDocument {
  @Prop()
  documentNumber: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  fullName: string;

  @Prop()
  query: string;

  @Prop()
  priority: string;

  @Prop()
  code: number;

  @Prop()
  state: string;

  @Prop({required: false, default: ''})
  solution: string;

  @Prop({required: false})
  responsible: string;
}

export const TicketSchema = SchemaFactory.createForClass(TicketDocument);
