
import { Types } from "mongoose";
import { AbstractDocument } from "src/common/database";
export class CreateConversationDto extends AbstractDocument {
  ticketId?: Types.ObjectId;
  socialNetworkConversationId?: string;      
  link: string;
  messagesCount: number;  
  socialNetworkType: "fb" | "twitter" | "insta" | "whatsapp";      
  solved?: boolean;
}