import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from '../../database/entities';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    actionUrl?: string,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create({
      userId,
      type,
      title,
      message,
      actionUrl,
    });
    return this.notificationRepository.save(notification);
  }

  async getAll(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async getUnread(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId, isRead: false },
      order: { createdAt: 'DESC' },
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationRepository.count({
      where: { userId, isRead: false },
    });
  }

  async markAsRead(id: string, userId: string): Promise<void> {
    await this.notificationRepository.update({ id, userId }, { isRead: true });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.update(
      { userId, isRead: false },
      { isRead: true },
    );
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.notificationRepository.delete({ id, userId });
  }

  // Helper methods for common notifications
  async notifyBookingRequest(
    hostId: string,
    renterName: string,
    listingTitle: string,
    bookingId: string,
  ) {
    return this.create(
      hostId,
      NotificationType.BOOKING_REQUEST,
      'New Booking Request',
      `${renterName} wants to book "${listingTitle}"`,
      `/bookings`,
    );
  }

  async notifyBookingConfirmed(
    renterId: string,
    listingTitle: string,
    bookingId: string,
  ) {
    return this.create(
      renterId,
      NotificationType.BOOKING_CONFIRMED,
      'Booking Confirmed!',
      `Your booking for "${listingTitle}" has been confirmed`,
      `/bookings`,
    );
  }

  async notifyNewMessage(
    userId: string,
    senderName: string,
    conversationId: string,
  ) {
    return this.create(
      userId,
      NotificationType.NEW_MESSAGE,
      'New Message',
      `${senderName} sent you a message`,
      `/messages`,
    );
  }

  async notifyNewReview(hostId: string, listingTitle: string, rating: number) {
    return this.create(
      hostId,
      NotificationType.NEW_REVIEW,
      'New Review',
      `Your listing "${listingTitle}" received a ${rating}-star review`,
      `/profile`,
    );
  }
}
