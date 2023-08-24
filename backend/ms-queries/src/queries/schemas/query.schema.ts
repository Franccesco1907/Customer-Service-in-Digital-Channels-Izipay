import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database';

@Schema({ versionKey: false })
export class QueryDocument extends AbstractDocument {
  @Prop()
  query: string;
}

export const QuerySchema = SchemaFactory.createForClass(QueryDocument);
