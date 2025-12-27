import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';

// Note: In production, add proper admin role guard
@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  async getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getAllUsers(
      parseInt(page || '1'),
      parseInt(limit || '20'),
    );
  }

  @Get('listings')
  async getListings(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getAllListings(
      parseInt(page || '1'),
      parseInt(limit || '20'),
      status,
    );
  }

  @Get('bookings')
  async getBookings(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getAllBookings(
      parseInt(page || '1'),
      parseInt(limit || '20'),
      status,
    );
  }

  @Get('activity')
  async getRecentActivity(@Query('limit') limit?: string) {
    return this.adminService.getRecentActivity(parseInt(limit || '10'));
  }

  @Put('listings/:id/status')
  async updateListingStatus(
    @Param('id') id: string,
    @Query('status') status: string,
  ) {
    return this.adminService.updateListingStatus(id, status);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Delete('listings/:id')
  async deleteListing(@Param('id') id: string) {
    return this.adminService.deleteListing(id);
  }
}
