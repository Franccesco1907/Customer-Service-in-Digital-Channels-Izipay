import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database';

@Schema({ versionKey: false })
export class SocialNetworkMessageDocument extends AbstractDocument {
  @Prop()
  ticketId?: Types.ObjectId;
  
  @Prop()
  userId?: Types.ObjectId;

  @Prop()
  conversationId?: Types.ObjectId;
  
  @Prop()
  socialNetworkMessageId?: string;

  @Prop()
  message: string;
  
  @Prop()
  sendAt: string;
  
  @Prop()
  socialNetworkUserId: string;
  
  @Prop()
  socialNetworkType: "fb" | "twitter" | "insta" | "whatsapp";    
  
  @Prop()
  hasQuestionIntention?: boolean;
}

export const SocialNetworkMessageSchema = SchemaFactory.createForClass(SocialNetworkMessageDocument);
