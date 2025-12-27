import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto, UpdateListingDto, ListingQueryDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  // Public: Get all active listings
  @Get()
  async findAll(@Query() query: ListingQueryDto) {
    return this.listingsService.findAll(query);
  }

  // Public: Get featured listings
  @Get('featured')
  async getFeatured(@Query('limit') limit?: number) {
    return this.listingsService.getFeatured(limit || 8);
  }

  // Public: Get single listing
  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.listingsService.incrementViewCount(id);
    return this.listingsService.findById(id);
  }

  // Protected: Create listing
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser('sub') hostId: string,
    @Body() dto: CreateListingDto,
  ) {
    return this.listingsService.create(hostId, dto);
  }

  // Protected: Get my listings
  @Get('host/my-listings')
  @UseGuards(JwtAuthGuard)
  async getMyListings(@CurrentUser('sub') hostId: string) {
    return this.listingsService.findByHost(hostId);
  }

  // Protected: Update listing
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @CurrentUser('sub') hostId: string,
    @Body() dto: UpdateListingDto,
  ) {
    return this.listingsService.update(id, hostId, dto);
  }

  // Protected: Publish listing
  @Post(':id/publish')
  @UseGuards(JwtAuthGuard)
  async publish(@Param('id') id: string, @CurrentUser('sub') hostId: string) {
    return this.listingsService.publish(id, hostId);
  }

  // Protected: Pause listing
  @Post(':id/pause')
  @UseGuards(JwtAuthGuard)
  async pause(@Param('id') id: string, @CurrentUser('sub') hostId: string) {
    return this.listingsService.pause(id, hostId);
  }

  // Protected: Delete listing
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @CurrentUser('sub') hostId: string) {
    await this.listingsService.delete(id, hostId);
    return { message: 'Listing deleted successfully' };
  }
}
