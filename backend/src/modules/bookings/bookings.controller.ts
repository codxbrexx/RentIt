import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }


  @Post()
  async create(
    @CurrentUser('sub') renterId: string,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingsService.create(renterId, dto);
  }


  @Get('my-bookings')
  async getMyBookings(@CurrentUser('sub') renterId: string) {
    return this.bookingsService.findByRenter(renterId);
  }


  @Get('host-bookings')
  async getHostBookings(@CurrentUser('sub') hostId: string) {
    return this.bookingsService.findByHost(hostId);
  }


  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser('sub') userId: string) {
    const booking = await this.bookingsService.findById(id);


    if (booking.renterId !== userId && booking.hostId !== userId) {
      throw new Error('You do not have access to this booking');
    }

    return booking;
  }


  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @CurrentUser('sub') userId: string,
    @Body() dto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.updateStatus(id, userId, dto);
  }


  @Get('listing/:listingId/dates')
  async getBookedDates(@Param('listingId') listingId: string) {
    return this.bookingsService.getBookedDates(listingId);
  }
}
