
import { Types } from "mongoose";
import { AbstractDocument } from "src/common/database";
export class CreateChatBotDto extends AbstractDocument {
    message: string;
    messageSendAt: number;
    role: "system" | "user" | "assistant";
    messageOrder: number;
    hasQuestionIntention?: boolean;    
    feelings?: [string];
    socialNetworkUserId: string;
}
  