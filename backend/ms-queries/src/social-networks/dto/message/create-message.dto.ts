
import { Types } from "mongoose";
import { AbstractDocument } from "src/common/database";
export class CreateMessageDto extends AbstractDocument {
  ticketId?: Types.ObjectId;    
  userId?: Types.ObjectId;  
  conversationId?: Types.ObjectId;
  socialNetworkMessageId?: string;
  message: string;  
  sendAt: string;
  socialNetworkUserId: string;
  socialNetworkType: "fb" | "twitter" | "insta" | "whatsapp";      
  hasQuestionIntention?: boolean;
}
  