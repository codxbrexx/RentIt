import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { Listing, ListingImage } from '../../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, ListingImage])],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsModule {}
