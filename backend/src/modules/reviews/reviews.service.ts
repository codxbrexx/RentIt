import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review, Booking, BookingStatus } from '../../database/entities';
import { CreateReviewDto, HostReplyDto } from './dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(reviewerId: string, dto: CreateReviewDto): Promise<Review> {
    // Get booking
    const booking = await this.bookingRepository.findOne({
      where: { id: dto.bookingId },
      relations: ['listing'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Only renter can review
    if (booking.renterId !== reviewerId) {
      throw new ForbiddenException('Only the renter can leave a review');
    }

    // Must be completed booking
    if (
      booking.status !== BookingStatus.COMPLETED &&
      booking.status !== BookingStatus.CONFIRMED
    ) {
      throw new BadRequestException(
        'Can only review completed or confirmed bookings',
      );
    }

    // Check if already reviewed
    const existingReview = await this.reviewRepository.findOne({
      where: { bookingId: dto.bookingId },
    });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this booking');
    }

    const review = this.reviewRepository.create({
      bookingId: dto.bookingId,
      listingId: booking.listingId,
      reviewerId,
      hostId: booking.hostId,
      rating: dto.rating,
      comment: dto.comment,
    });

    return this.reviewRepository.save(review);
  }

  async addHostReply(
    reviewId: string,
    hostId: string,
    dto: HostReplyDto,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.hostId !== hostId) {
      throw new ForbiddenException('Only the host can reply to this review');
    }

    if (review.hostReply) {
      throw new BadRequestException('You have already replied to this review');
    }

    review.hostReply = dto.reply;
    review.hostRepliedAt = new Date();

    return this.reviewRepository.save(review);
  }

  async getByListing(
    listingId: string,
  ): Promise<{
    reviews: Review[];
    stats: { averageRating: number; totalReviews: number };
  }> {
    const reviews = await this.reviewRepository.find({
      where: { listingId },
      relations: ['reviewer', 'reviewer.profile'],
      order: { createdAt: 'DESC' },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    return {
      reviews,
      stats: {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews,
      },
    };
  }

  async getByUser(userId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { reviewerId: userId },
      relations: ['listing', 'listing.images'],
      order: { createdAt: 'DESC' },
    });
  }

  async getHostReviews(hostId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { hostId },
      relations: ['listing', 'listing.images', 'reviewer', 'reviewer.profile'],
      order: { createdAt: 'DESC' },
    });
  }
}
