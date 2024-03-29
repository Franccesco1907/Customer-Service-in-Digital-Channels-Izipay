import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SocialNetworksService } from './social-networks.service';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/comment/create-comment.dto';
import { CreateMessageDto } from './dto/message/create-message.dto';
import { SyncCommentsDto } from './dto/comment/sync-comment.dto';
import { SyncMessagesDto } from './dto/message/sync-message.dto';
import { AnswerMessageDto } from './dto/message/answer-message.dto';
import { AnswerCommentDto } from './dto/comment/answer-comment.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('social-networks')
export class SocialNetworksController {
  constructor(private readonly socialNetworksService: SocialNetworksService) {}
  
  @Post('comment-fb')
  createFacebookComment(
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.socialNetworksService.createComment(createCommentDto);
  }

  @Get('comment-fb')
  findAllFacebookComments() {
    return this.socialNetworksService.findAllComments();
  }

  @Get('comment-fb/:id')
  findOneFacebookComment(@Param('id') _id: string) {
    return this.socialNetworksService.findOneComment(_id);
  }

  @Post('comment-fb/sync')
  syncFacebookComment(
    @Body() syncCommentDto: SyncCommentsDto,
  ) {
    return this.socialNetworksService.syncComments(syncCommentDto);
  }

  @Post('comment-fb/answer')
  answerFacebookComment(
    @Body() answerCommentDto: AnswerCommentDto,
  ) {
    console.log("join");
    return this.socialNetworksService.postFacebookAnswerToComment(answerCommentDto);
  }

  @Post('message-fb')
  createFacebookMessage(
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.socialNetworksService.createMessage(createMessageDto);
  }

  @Get('message-fb')
  findAllFacebookMessages() {
    return this.socialNetworksService.findAllMessages();
  }

  @Get('message-fb/:id')
  findOneFacebookMessage(@Param('id') _id: string) {
    return this.socialNetworksService.findOneMessage(_id);
  }

  @Post('message-fb/sync')
  syncFacebookMessage(
    @Body() syncMessageDto: SyncMessagesDto,
  ) {
    return this.socialNetworksService.syncMessages(syncMessageDto);
  }

  @Post('message-fb/answer')
  answerFacebookMessage(
    @Body() answerMessageDto: AnswerMessageDto,
  ) {
    console.log("join");
    return this.socialNetworksService.postFacebookAnswerToMessage(answerMessageDto);
  }

  @EventPattern('message-fb-answer')
  answerFbMessage(@Payload() answerMessageDto: AnswerMessageDto) {
    console.log("HIFB")
    return this.socialNetworksService.postFacebookAnswerToMessage(answerMessageDto);
  }
}
