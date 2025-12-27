import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import {
  User,
  Listing,
  Booking,
  Review,
  ListingStatus,
  BookingStatus,
} from '../../database/entities';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async getDashboardStats() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      newUsersThisMonth,
      totalListings,
      activeListings,
      totalBookings,
      pendingBookings,
      completedBookings,
      recentBookings,
      totalReviews,
      totalRevenue,
    ] = await Promise.all([
      this.userRepository.count(),
      this.userRepository.count({
        where: { createdAt: MoreThanOrEqual(thirtyDaysAgo) },
      }),
      this.listingRepository.count(),
      this.listingRepository.count({ where: { status: ListingStatus.ACTIVE } }),
      this.bookingRepository.count(),
      this.bookingRepository.count({
        where: { status: BookingStatus.PENDING },
      }),
      this.bookingRepository.count({
        where: { status: BookingStatus.COMPLETED },
      }),
      this.bookingRepository.count({
        where: { createdAt: MoreThanOrEqual(sevenDaysAgo) },
      }),
      this.reviewRepository.count(),
      this.bookingRepository
        .createQueryBuilder('b')
        .select('SUM(b.total_amount)', 'total')
        .where('b.status IN (:...statuses)', {
          statuses: ['confirmed', 'completed'],
        })
        .getRawOne(),
    ]);

    return {
      users: {
        total: totalUsers,
        newThisMonth: newUsersThisMonth,
      },
      listings: {
        total: totalListings,
        active: activeListings,
      },
      bookings: {
        total: totalBookings,
        pending: pendingBookings,
        completed: completedBookings,
        recentWeek: recentBookings,
      },
      reviews: {
        total: totalReviews,
      },
      revenue: {
        total: Number(totalRevenue?.total || 0),
      },
    };
  }

  async getAllUsers(page = 1, limit = 20) {
    const [users, total] = await this.userRepository.findAndCount({
      relations: ['profile'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      users: users.map((u) => ({
        id: u.id,
        email: u.email,
        role: u.role,
        emailVerified: u.emailVerified,
        profile: u.profile,
        createdAt: u.createdAt,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getAllListings(page = 1, limit = 20, status?: string) {
    const where: any = {};
    if (status) where.status = status;

    const [listings, total] = await this.listingRepository.findAndCount({
      where,
      relations: ['host', 'host.profile', 'images'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      listings,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getAllBookings(page = 1, limit = 20, status?: string) {
    const where: any = {};
    if (status) where.status = status;

    const [bookings, total] = await this.bookingRepository.findAndCount({
      where,
      relations: [
        'listing',
        'renter',
        'renter.profile',
        'host',
        'host.profile',
      ],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      bookings,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getRecentActivity(limit = 10) {
    const [recentBookings, recentUsers, recentListings] = await Promise.all([
      this.bookingRepository.find({
        relations: ['listing', 'renter', 'renter.profile'],
        order: { createdAt: 'DESC' },
        take: limit,
      }),
      this.userRepository.find({
        relations: ['profile'],
        order: { createdAt: 'DESC' },
        take: limit,
      }),
      this.listingRepository.find({
        relations: ['host', 'host.profile'],
        order: { createdAt: 'DESC' },
        take: limit,
      }),
    ]);

    return { recentBookings, recentUsers, recentListings };
  }

  async updateListingStatus(id: string, status: string) {
    await this.listingRepository.update(id, {
      status: status as ListingStatus,
    });
    return this.listingRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
    return { success: true };
  }

  async deleteListing(id: string) {
    await this.listingRepository.delete(id);
    return { success: true };
  }
}
