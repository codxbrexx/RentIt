import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User, Listing, Booking, Review } from '../../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Listing, Booking, Review])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
