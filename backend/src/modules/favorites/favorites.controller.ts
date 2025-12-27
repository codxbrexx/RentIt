import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }


  @Post(':listingId')
  async toggle(
    @CurrentUser('sub') userId: string,
    @Param('listingId') listingId: string,
  ) {
    return this.favoritesService.toggle(userId, listingId);
  }


  @Get()
  async getFavorites(@CurrentUser('sub') userId: string) {
    return this.favoritesService.getFavorites(userId);
  }


  @Get('ids')
  async getFavoriteIds(@CurrentUser('sub') userId: string) {
    return this.favoritesService.getFavoriteIds(userId);
  }


  @Get('check/:listingId')
  async check(
    @CurrentUser('sub') userId: string,
    @Param('listingId') listingId: string,
  ) {
    const isFavorite = await this.favoritesService.isFavorite(
      userId,
      listingId,
    );
    return { isFavorite };
  }
}
