import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, HostReplyDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }


  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser('sub') reviewerId: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.create(reviewerId, dto);
  }


  @Post(':id/reply')
  @UseGuards(JwtAuthGuard)
  async addReply(
    @Param('id') reviewId: string,
    @CurrentUser('sub') hostId: string,
    @Body() dto: HostReplyDto,
  ) {
    return this.reviewsService.addHostReply(reviewId, hostId, dto);
  }


  @Get('listing/:listingId')
  async getByListing(@Param('listingId') listingId: string) {
    return this.reviewsService.getByListing(listingId);
  }


  @Get('my-reviews')
  @UseGuards(JwtAuthGuard)
  async getMyReviews(@CurrentUser('sub') userId: string) {
    return this.reviewsService.getByUser(userId);
  }


  @Get('host-reviews')
  @UseGuards(JwtAuthGuard)
  async getHostReviews(@CurrentUser('sub') hostId: string) {
    return this.reviewsService.getHostReviews(hostId);
  }
}
