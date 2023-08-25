import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database';

@Schema({ versionKey: false })
export class SocialNetworkCommentDocument extends AbstractDocument {
  @Prop()
  ticketId?: Types.ObjectId;

  @Prop()
  userId?: Types.ObjectId;

  @Prop()
  socialNetworkCommentId?: string;

  @Prop()
  message: string;

  @Prop()
  sendAt: string;

  @Prop()
  socialNetworkUserId: string;

  @Prop()
  socialNetworkType: "fb" | "twitter" | "insta";

  @Prop()
  hasQuestionIntention?: boolean;
}

export const SocialNetworkCommentSchema = SchemaFactory.createForClass(SocialNetworkCommentDocument);
