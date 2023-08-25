import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database';

@Schema({ versionKey: false })
export class SocialNetworkConversationsDocument extends AbstractDocument {
  @Prop()
  ticketId?: Types.ObjectId;
  
  @Prop()
  socialNetworkConversationId?: string;
  
  @Prop()
  link: string;
  
  @Prop()
  messagesCount: number;
  
  @Prop()
  socialNetworkType: "fb" | "twitter" | "insta" | "whatsapp";    
  
  @Prop()
  solved?: boolean;
}

export const SocialNetworkConversationSchema = SchemaFactory.createForClass(SocialNetworkConversationsDocument);
