import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

@Entity('listing_images')
export class ListingImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'listing_id' })
  listingId: string;

  @ManyToOne(() => Listing, (listing) => listing.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column()
  url: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column({ default: 0 })
  position: number;

  @Column({ nullable: true })
  caption: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
