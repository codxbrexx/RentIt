import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Conversation, Message } from '../../database/entities';
import { CreateConversationDto, SendMessageDto } from './dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createConversation(
    senderId: string,
    dto: CreateConversationDto,
  ): Promise<Conversation> {
    // Check for existing conversation
    const existing = await this.findExistingConversation(
      senderId,
      dto.recipientId,
      dto.listingId,
    );

    if (existing) {
      // Add message to existing conversation
      await this.sendMessage(existing.id, senderId, { content: dto.message });
      return this.getConversationById(existing.id, senderId);
    }

    // Create new conversation
    const conversation = this.conversationRepository.create({
      participantOneId: senderId,
      participantTwoId: dto.recipientId,
      listingId: dto.listingId,
      lastMessage: dto.message,
      lastMessageAt: new Date(),
    });

    const saved = await this.conversationRepository.save(conversation);

    // Add first message
    const message = this.messageRepository.create({
      conversationId: saved.id,
      senderId,
      content: dto.message,
    });
    await this.messageRepository.save(message);

    return this.getConversationById(saved.id, senderId);
  }

  async findExistingConversation(
    userOneId: string,
    userTwoId: string,
    listingId?: string,
  ): Promise<Conversation | null> {
    const query = this.conversationRepository
      .createQueryBuilder('c')
      .where(
        '((c.participant_one_id = :userOneId AND c.participant_two_id = :userTwoId) OR (c.participant_one_id = :userTwoId AND c.participant_two_id = :userOneId))',
        { userOneId, userTwoId },
      );

    if (listingId) {
      query.andWhere('c.listing_id = :listingId', { listingId });
    }

    return query.getOne();
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    return this.conversationRepository.find({
      where: [{ participantOneId: userId }, { participantTwoId: userId }],
      relations: [
        'participantOne',
        'participantOne.profile',
        'participantTwo',
        'participantTwo.profile',
        'listing',
      ],
      order: { lastMessageAt: 'DESC' },
    });
  }

  async getConversationById(id: string, userId: string): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: [
        'participantOne',
        'participantOne.profile',
        'participantTwo',
        'participantTwo.profile',
        'listing',
        'messages',
        'messages.sender',
        'messages.sender.profile',
      ],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (
      conversation.participantOneId !== userId &&
      conversation.participantTwoId !== userId
    ) {
      throw new ForbiddenException('You are not part of this conversation');
    }

    // Mark messages as read
    await this.messageRepository.update(
      {
        conversationId: id,
        isRead: false,
        senderId: In([
          conversation.participantOneId === userId
            ? conversation.participantTwoId
            : conversation.participantOneId,
        ]),
      },
      { isRead: true },
    );

    return conversation;
  }

  async sendMessage(
    conversationId: string,
    senderId: string,
    dto: SendMessageDto,
  ): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (
      conversation.participantOneId !== senderId &&
      conversation.participantTwoId !== senderId
    ) {
      throw new ForbiddenException('You are not part of this conversation');
    }

    const message = this.messageRepository.create({
      conversationId,
      senderId,
      content: dto.content,
    });

    const saved = await this.messageRepository.save(message);

    // Update conversation
    await this.conversationRepository.update(conversationId, {
      lastMessage: dto.content,
      lastMessageAt: new Date(),
    });

    return saved;
  }

  async getUnreadCount(userId: string): Promise<number> {
    const conversations = await this.conversationRepository.find({
      where: [{ participantOneId: userId }, { participantTwoId: userId }],
    });

    const conversationIds = conversations.map((c) => c.id);

    if (conversationIds.length === 0) return 0;

    return this.messageRepository.count({
      where: {
        conversationId: In(conversationIds),
        isRead: false,
        senderId: In(
          conversations.map((c) =>
            c.participantOneId === userId
              ? c.participantTwoId
              : c.participantOneId,
          ),
        ),
      },
    });
  }
}
