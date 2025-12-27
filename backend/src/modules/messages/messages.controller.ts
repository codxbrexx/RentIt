import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateConversationDto, SendMessageDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }


  @Post('conversations')
  async createConversation(
    @CurrentUser('sub') senderId: string,
    @Body() dto: CreateConversationDto,
  ) {
    return this.messagesService.createConversation(senderId, dto);
  }


  @Get('conversations')
  async getConversations(@CurrentUser('sub') userId: string) {
    return this.messagesService.getConversations(userId);
  }


  @Get('conversations/:id')
  async getConversation(
    @Param('id') id: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.messagesService.getConversationById(id, userId);
  }


  @Post('conversations/:id')
  async sendMessage(
    @Param('id') conversationId: string,
    @CurrentUser('sub') senderId: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.messagesService.sendMessage(conversationId, senderId, dto);
  }


  @Get('unread')
  async getUnreadCount(@CurrentUser('sub') userId: string) {
    const count = await this.messagesService.getUnreadCount(userId);
    return { unreadCount: count };
  }
}
