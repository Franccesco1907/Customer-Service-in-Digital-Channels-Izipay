import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database';

@Schema({ versionKey: false })
export class ChatBotDocument extends AbstractDocument {
  @Prop()
  message: string;

  @Prop()
  messageSendAt: number;

  @Prop()
  role: "system" | "user" | "assistant";

  @Prop()
  messageOrder: number;

  @Prop()
  hasQuestionIntention?: boolean;

  @Prop()
  feelings?: [string];

  @Prop()
  socialNetworkUserId: string;
}

export const ChatBotSchema = SchemaFactory.createForClass(ChatBotDocument);
