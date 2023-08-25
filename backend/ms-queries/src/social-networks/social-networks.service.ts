import { Injectable, NotFoundException } from '@nestjs/common';
import { SocialNetworkCommentRepository } from './comments.repository';
import { SocialNetworkMessageRepository } from './messages.repository';
import { CreateCommentDto } from './dto/comment/create-comment.dto';
import { CreateMessageDto } from './dto/message/create-message.dto';
import { SyncCommentsDto } from './dto/comment/sync-comment.dto';
import { SyncMessagesDto } from './dto/message/sync-message.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { AxiosError } from 'axios';
import { FACEBOOK_API_URL, FACEBOOK_COMMENTS, FACEBOOK_CONVERSATIONS, FACEBOOK_FIELDS, FACEBOOK_FIELD_ACCESSTOKEN, FACEBOOK_FIELD_DATECREATION, FACEBOOK_FIELD_FROM, FACEBOOK_FIELD_ID, FACEBOOK_FIELD_LINK, FACEBOOK_FIELD_MESSAGE, FACEBOOK_FIELD_MESSAGES, FACEBOOK_FIELD_MESSAGE_COUNT, FACEBOOK_PAGE_BASE_ID, FACEBOOK_POSTS } from './constants/fb-uri';
import { FacebookRestResponse, Post, Comment } from './dto/fb/posts';
import { Conversation, Message } from './dto/fb/conversations';
import { SocialNetworkConversationsRepository } from './conversations.repository';
import { CreateConversationDto } from './dto/message/create-conversation.dto';
import { ObjectId, Types } from 'mongoose';

@Injectable()
export class SocialNetworksService {
  constructor(private readonly socialNetworkCommentRepository: SocialNetworkCommentRepository,
    private readonly socialNetworkMessageRepository: SocialNetworkMessageRepository,
    private readonly socialNetworkConversationsRepository: SocialNetworkConversationsRepository,
    private readonly httpService: HttpService
  ) {}

  createComment(createCommentDto: CreateCommentDto) {
    return this.socialNetworkCommentRepository.create(createCommentDto);
  }
  
  findAllComments() {
    return this.socialNetworkCommentRepository.find({});
  }
  
  findOneComment(_id: string) {
    return this.socialNetworkCommentRepository.findOne({ _id });
  }

  async syncComments(syncCommentsDto: SyncCommentsDto) : Promise<string []>{
    const posts = await this.getFacebookPosts(syncCommentsDto.token);
    const commentsInserted = [];
    for(const post of posts){        
      const comments = await this.getFacebookCommentsFromPost(post.id, syncCommentsDto.token);                
      for(const comment of comments){            
        const inserted = await this.buildAndInsertFacebookComment(comment);
        if(inserted) commentsInserted.push(comment.id);
      }
    }      
    return commentsInserted;
  }

  createMessage(createMessageDto: CreateMessageDto) {
    return this.socialNetworkMessageRepository.create(createMessageDto);
  }
    
  findAllMessages() {
    return this.socialNetworkMessageRepository.find({});
  }

  findOneMessage(_id: string) {
    return this.socialNetworkMessageRepository.findOne({ _id });
  }

  async syncMessages(syncMessagesDto: SyncMessagesDto) {
    const conversations = await this.getFacebookConversations(syncMessagesDto.token);    
    const messagesInserted = [];
    for(const conversation of conversations) {
      console.log(conversation)
      const insertedConversationId = await this.buildAndInsertFacebookConversation(conversation)
      if (insertedConversationId) {
          await this.socialNetworkMessageRepository.deleteMany({conversationId:  insertedConversationId})            
          for(const message of conversation.messages.data) {
              const messageFetched = await this.getFacebookMessage(message.id, syncMessagesDto.token);
              const messageInserted = await this.buildAndInsertFacebookMessage(messageFetched, insertedConversationId);
              if(messageInserted) {
                  messagesInserted.push(message.id);
              }
          }    
      }         
    }
    return messagesInserted;
  }

  private async fetchData<T>(apiUrl: string): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.get<T>(apiUrl).pipe(
        catchError((error : AxiosError) => {
          console.error(error.response.data);
          throw `Error on fetching data from: ${apiUrl}`
        }), 
      ),
    );
    return response.data;
  }

  private async getFacebookPosts(token: string): Promise<Post[]> {
    const URI = `${FACEBOOK_API_URL}/${FACEBOOK_PAGE_BASE_ID}/${FACEBOOK_POSTS}?${FACEBOOK_FIELD_ACCESSTOKEN}=${token}`;
    const fbRestResponse = await this.fetchData<FacebookRestResponse>(URI);

    const posts : Post[] = fbRestResponse.data;
    return posts;
  }

  private async getFacebookCommentsFromPost(idPost: string, token: string): Promise<Comment[]> {
    const URI = `${FACEBOOK_API_URL}/${idPost}/${FACEBOOK_COMMENTS}?${FACEBOOK_FIELD_ACCESSTOKEN}=${token}`;
    const fbRestResponse = await this.fetchData<FacebookRestResponse>(URI);
  
    const comments : Comment[] = fbRestResponse.data;
    return comments;
  }

  private async buildAndInsertFacebookComment(comment: Comment): Promise<boolean>{
    
    const commentFound = await this.socialNetworkCommentRepository.findOne({socialNetworkCommentId : comment.id});
    if(commentFound) {
        return false;
    }

    const commentDTO = new CreateCommentDto();
    commentDTO.createdAt = new Date();
    commentDTO.message = comment.message;
    commentDTO.sendAt = comment.created_time;
    commentDTO.socialNetworkCommentId = comment.id;
    commentDTO.socialNetworkType = 'fb';
    commentDTO.socialNetworkUserId = comment.from.id;
    commentDTO.ticketId = null;
    commentDTO.userId = null;
    commentDTO.hasQuestionIntention = null;

    this.socialNetworkCommentRepository.create(commentDTO);
    return true;
  }

  private async buildAndInsertFacebookConversation(conversation: Conversation): Promise<Types.ObjectId | null>{    
    const conversationFound = await this.socialNetworkConversationsRepository.findOne({socialNetworkConversationId : conversation.id});    
    if(conversationFound && conversationFound.messagesCount === conversation.message_count) {      
      return null;
    } else if(conversationFound && conversationFound.messagesCount !== conversation.message_count) {
      conversationFound.messagesCount = conversation.message_count;
      const entityConversation = await this.socialNetworkConversationsRepository.findOneAndUpdate({socialNetworkConversationId : conversation.id}, conversationFound);
      return entityConversation._id;
    }

    const conversationDTO = new CreateConversationDto();
    conversationDTO.createdAt = new Date();
    conversationDTO.link = conversation.link;
    conversationDTO.messagesCount = conversation.message_count;
    conversationDTO.socialNetworkConversationId = conversation.id;
    conversationDTO.socialNetworkType = 'fb';
    conversationDTO.solved = null;
    conversationDTO.ticketId = null;

    const entityConversation = await this.socialNetworkConversationsRepository.create(conversationDTO);
    return entityConversation._id;
  }

  private async buildAndInsertFacebookMessage(message: Message, conversationId: Types.ObjectId) : Promise<boolean>{
    const messageFound = await this.socialNetworkMessageRepository.findOne({socialNetworkMessageId : message.id});
    if(messageFound) {
        return false;
    }

    const messageDTO = new CreateMessageDto();
    messageDTO.conversationId = conversationId;
    messageDTO.createdAt = new Date();
    messageDTO.hasQuestionIntention = null;
    messageDTO.message = message.message;
    messageDTO.sendAt = message.created_time;
    messageDTO.socialNetworkMessageId = message.id;
    messageDTO.socialNetworkType = 'fb';
    messageDTO.socialNetworkUserId = message.from.id;
    messageDTO.ticketId = null;
    messageDTO.userId = null;    

    this.socialNetworkMessageRepository.create(messageDTO);
    return true;
  }

  private async getFacebookConversations(token: string) {
    const URI = `${FACEBOOK_API_URL}/${FACEBOOK_PAGE_BASE_ID}/${FACEBOOK_CONVERSATIONS}?${FACEBOOK_FIELDS}=${FACEBOOK_FIELD_ID},${FACEBOOK_FIELD_MESSAGES},${FACEBOOK_FIELD_MESSAGE_COUNT},${FACEBOOK_FIELD_LINK}&${FACEBOOK_FIELD_ACCESSTOKEN}=${token}`
    const fbRestResponse = await this.fetchData<FacebookRestResponse>(URI);
    const conversations : Conversation[]= fbRestResponse.data;
        
    return conversations;
  }

  private async getFacebookMessage(messageId: string, token: string) : Promise<Message>{
    const URI = `${FACEBOOK_API_URL}/${messageId}?${FACEBOOK_FIELDS}=${FACEBOOK_FIELD_FROM},${FACEBOOK_FIELD_MESSAGE},${FACEBOOK_FIELD_DATECREATION}&${FACEBOOK_FIELD_ACCESSTOKEN}=${token}`;
    const message = await this.fetchData<Message>(URI); 
    
    return message;   
  }
}
