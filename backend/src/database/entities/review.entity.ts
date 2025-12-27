import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Listing } from './listing.entity';
import { Booking } from './booking.entity';

@Entity('reviews')
@Unique(['bookingId']) // One review per booking
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'booking_id' })
  bookingId: string;

  @ManyToOne(() => Booking)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({ name: 'listing_id' })
  listingId: string;

  @ManyToOne(() => Listing)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column({ name: 'reviewer_id' })
  reviewerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: User;

  @Column({ name: 'host_id' })
  hostId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @Column({ type: 'integer' })
  rating: number; // 1-5 stars

  @Column({ type: 'text' })
  comment: string;

  @Column({ name: 'host_reply', type: 'text', nullable: true })
  hostReply: string;

  @Column({ name: 'host_replied_at', type: 'datetime', nullable: true })
  hostRepliedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
