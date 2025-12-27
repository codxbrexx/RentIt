import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Listing } from './listing.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'listing_id' })
  listingId: string;

  @ManyToOne(() => Listing)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column({ name: 'renter_id' })
  renterId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'renter_id' })
  renter: User;

  @Column({ name: 'host_id' })
  hostId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @Column({ name: 'start_date', type: 'datetime' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'datetime' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({
    name: 'service_fee',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  serviceFee: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ default: 'pending' })
  status: BookingStatus;

  @Column({ name: 'payment_intent_id', nullable: true })
  paymentIntentId: string;

  @Column({ name: 'cancellation_reason', type: 'text', nullable: true })
  cancellationReason: string;

  @Column({ name: 'cancelled_at', type: 'datetime', nullable: true })
  cancelledAt: Date;

  @Column({ name: 'cancelled_by', nullable: true })
  cancelledBy: string;

  @Column({ type: 'text', nullable: true })
  message: string; // Renter's message to host

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
