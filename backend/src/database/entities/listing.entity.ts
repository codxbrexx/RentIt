import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ListingImage } from './listing-image.entity';

export enum ListingStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  ARCHIVED = 'archived',
}

export enum PriceUnit {
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'host_id' })
  hostId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  subcategory: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'base_price' })
  basePrice: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ name: 'price_unit', default: 'day' })
  priceUnit: PriceUnit;

  @Column({ name: 'min_duration', default: 1 })
  minDuration: number;

  @Column({ name: 'max_duration', nullable: true })
  maxDuration: number;

  @Column({ name: 'instant_book', default: false })
  instantBook: boolean;

  @Column({ default: 'draft' })
  status: ListingStatus;

  @Column({ type: 'text', nullable: true })
  amenities: string; // JSON string array

  @Column({ type: 'text', nullable: true })
  rules: string;

  @Column({ name: 'cancellation_policy', nullable: true })
  cancellationPolicy: string;

  @Column({ name: 'view_count', default: 0 })
  viewCount: number;

  @OneToMany(() => ListingImage, (image) => image.listing, { cascade: true })
  images: ListingImage[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
