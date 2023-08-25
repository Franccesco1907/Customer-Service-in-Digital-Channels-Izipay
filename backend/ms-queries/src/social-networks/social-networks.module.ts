import { Module } from '@nestjs/common';
import { SocialNetworksService } from './social-networks.service';
import { SocialNetworksController } from './social-networks.controller';
import { DatabaseModule } from 'src/common/database';
import { SocialNetworkCommentDocument, SocialNetworkCommentSchema } from './schemas/comments.schema';
import { SocialNetworkMessageDocument, SocialNetworkMessageSchema } from './schemas/messages.schema';
import { SocialNetworkCommentRepository } from './comments.repository';
import { SocialNetworkMessageRepository } from './messages.repository';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { SocialNetworkConversationsRepository } from './conversations.repository';
import { SocialNetworkConversationSchema, SocialNetworkConversationsDocument } from './schemas/conversations.schema';


@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: SocialNetworkCommentDocument.name, schema: SocialNetworkCommentSchema },
      { name: SocialNetworkMessageDocument.name, schema: SocialNetworkMessageSchema },
      { name: SocialNetworkConversationsDocument.name, schema: SocialNetworkConversationSchema },
    ]),
    HttpModule
  ],
  providers: [
    SocialNetworksService,    
    SocialNetworkCommentRepository,
    SocialNetworkMessageRepository,
    SocialNetworkConversationsRepository,
  ],
  controllers: [SocialNetworksController]
})
export class SocialNetworksModule {}
