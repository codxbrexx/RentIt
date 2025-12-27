import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../../database/entities';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async toggle(
    userId: string,
    listingId: string,
  ): Promise<{ isFavorite: boolean }> {
    const existing = await this.favoriteRepository.findOne({
      where: { userId, listingId },
    });

    if (existing) {
      await this.favoriteRepository.delete(existing.id);
      return { isFavorite: false };
    }

    const favorite = this.favoriteRepository.create({ userId, listingId });
    await this.favoriteRepository.save(favorite);
    return { isFavorite: true };
  }

  async getFavorites(userId: string) {
    return this.favoriteRepository.find({
      where: { userId },
      relations: [
        'listing',
        'listing.images',
        'listing.host',
        'listing.host.profile',
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async isFavorite(userId: string, listingId: string): Promise<boolean> {
    const count = await this.favoriteRepository.count({
      where: { userId, listingId },
    });
    return count > 0;
  }

  async getFavoriteIds(userId: string): Promise<string[]> {
    const favorites = await this.favoriteRepository.find({
      where: { userId },
      select: ['listingId'],
    });
    return favorites.map((f) => f.listingId);
  }
}
