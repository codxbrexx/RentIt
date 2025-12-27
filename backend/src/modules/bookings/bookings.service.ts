import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import {
  Booking,
  BookingStatus,
  Listing,
  ListingStatus,
} from '../../database/entities';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
  ) {}

  async create(renterId: string, dto: CreateBookingDto): Promise<Booking> {
    // Get listing
    const listing = await this.listingRepository.findOne({
      where: { id: dto.listingId, status: ListingStatus.ACTIVE },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found or not available');
    }

    // Cannot book own listing
    if (listing.hostId === renterId) {
      throw new BadRequestException('You cannot book your own listing');
    }

    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    // Validate dates
    if (startDate >= endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    if (startDate < new Date()) {
      throw new BadRequestException('Start date cannot be in the past');
    }

    // Check for conflicting bookings
    const conflict = await this.checkConflict(
      dto.listingId,
      startDate,
      endDate,
    );
    if (conflict) {
      throw new BadRequestException('These dates are not available');
    }

    // Calculate pricing
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const subtotal = Number(listing.basePrice) * days;
    const serviceFee = subtotal * 0.1; // 10% service fee
    const totalAmount = subtotal + serviceFee;

    // Create booking
    const booking = this.bookingRepository.create({
      listingId: dto.listingId,
      renterId,
      hostId: listing.hostId,
      startDate,
      endDate,
      subtotal,
      serviceFee,
      totalAmount,
      currency: listing.currency,
      status: listing.instantBook
        ? BookingStatus.CONFIRMED
        : BookingStatus.PENDING,
      message: dto.message,
    });

    return this.bookingRepository.save(booking);
  }

  async checkConflict(
    listingId: string,
    startDate: Date,
    endDate: Date,
    excludeBookingId?: string,
  ): Promise<boolean> {
    const query = this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.listing_id = :listingId', { listingId })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      })
      .andWhere(
        '(booking.start_date < :endDate AND booking.end_date > :startDate)',
        { startDate, endDate },
      );

    if (excludeBookingId) {
      query.andWhere('booking.id != :excludeId', {
        excludeId: excludeBookingId,
      });
    }

    const count = await query.getCount();
    return count > 0;
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: [
        'listing',
        'listing.images',
        'renter',
        'renter.profile',
        'host',
        'host.profile',
      ],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async findByRenter(renterId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { renterId },
      relations: ['listing', 'listing.images', 'host', 'host.profile'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByHost(hostId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { hostId },
      relations: ['listing', 'listing.images', 'renter', 'renter.profile'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(
    id: string,
    userId: string,
    dto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    const booking = await this.findById(id);

    // Only host can confirm/reject, both can cancel
    if (dto.status === 'confirmed' || dto.status === 'rejected') {
      if (booking.hostId !== userId) {
        throw new ForbiddenException(
          'Only the host can confirm or reject bookings',
        );
      }
    }

    if (dto.status === 'cancelled') {
      if (booking.renterId !== userId && booking.hostId !== userId) {
        throw new ForbiddenException('You cannot cancel this booking');
      }
    }

    // Validate status transition
    if (
      booking.status !== BookingStatus.PENDING &&
      (dto.status === 'confirmed' || dto.status === 'rejected')
    ) {
      throw new BadRequestException('Can only confirm/reject pending bookings');
    }

    const updateData: Partial<Booking> = {
      status: dto.status as BookingStatus,
    };

    if (dto.status === 'cancelled') {
      updateData.cancellationReason = dto.reason;
      updateData.cancelledAt = new Date();
      updateData.cancelledBy = userId;
    }

    await this.bookingRepository.update(id, updateData);
    return this.findById(id);
  }

  async getBookedDates(
    listingId: string,
  ): Promise<{ startDate: Date; endDate: Date }[]> {
    const bookings = await this.bookingRepository.find({
      where: {
        listingId,
        status: Not(BookingStatus.CANCELLED),
        endDate: MoreThanOrEqual(new Date()),
      },
      select: ['startDate', 'endDate'],
    });

    return bookings.map((b) => ({
      startDate: b.startDate,
      endDate: b.endDate,
    }));
  }
}
