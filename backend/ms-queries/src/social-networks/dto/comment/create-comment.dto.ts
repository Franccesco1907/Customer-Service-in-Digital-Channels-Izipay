
import { Types } from "mongoose";
import { AbstractDocument } from "src/common/database";
export class CreateCommentDto extends AbstractDocument {
  ticketId?: Types.ObjectId;
  userId?: Types.ObjectId;
  socialNetworkCommentId?: string;
  message: string;
  sendAt: string;
  socialNetworkUserId: string;
  socialNetworkType: "fb" | "twitter" | "insta";
  hasQuestionIntention?: boolean;
}
  