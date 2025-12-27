import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Like,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { Listing, ListingImage, ListingStatus } from '../../database/entities';
import { CreateListingDto, UpdateListingDto, ListingQueryDto } from './dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(ListingImage)
    private readonly imageRepository: Repository<ListingImage>,
  ) {}

  async create(hostId: string, dto: CreateListingDto): Promise<Listing> {
    const listingData = {
      hostId,
      title: dto.title,
      description: dto.description,
      category: dto.category,
      subcategory: dto.subcategory,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      country: dto.country,
      basePrice: dto.basePrice,
      currency: dto.currency || 'USD',
      priceUnit: (dto.priceUnit as any) || 'day',
      minDuration: dto.minDuration || 1,
      maxDuration: dto.maxDuration,
      instantBook: dto.instantBook || false,
      amenities: dto.amenities ? JSON.stringify(dto.amenities) : undefined,
      rules: dto.rules,
      cancellationPolicy: dto.cancellationPolicy,
      status: ListingStatus.DRAFT,
    };

    const listing = this.listingRepository.create(listingData);
    const savedListing = await this.listingRepository.save(listing);

    // Handle array result from save
    const saved = Array.isArray(savedListing) ? savedListing[0] : savedListing;

    // Save images if provided
    if (dto.images && dto.images.length > 0) {
      const images = dto.images.map((img, index) =>
        this.imageRepository.create({
          listingId: saved.id,
          url: img.url,
          caption: img.caption,
          position: index,
        }),
      );
      await this.imageRepository.save(images);
    }

    return this.findById(saved.id);
  }

  async findAll(query: ListingQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const where: any = { status: ListingStatus.ACTIVE };

    if (query.category) {
      where.category = query.category;
    }

    if (query.city) {
      where.city = Like(`%${query.city}%`);
    }

    if (query.search) {
      where.title = Like(`%${query.search}%`);
    }

    if (query.minPrice && query.maxPrice) {
      where.basePrice = Between(query.minPrice, query.maxPrice);
    } else if (query.minPrice) {
      where.basePrice = MoreThanOrEqual(query.minPrice);
    } else if (query.maxPrice) {
      where.basePrice = LessThanOrEqual(query.maxPrice);
    }

    const [listings, total] = await this.listingRepository.findAndCount({
      where,
      relations: ['images', 'host', 'host.profile'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      listings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['images', 'host', 'host.profile'],
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  async findByHost(hostId: string) {
    return this.listingRepository.find({
      where: { hostId },
      relations: ['images'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(
    id: string,
    hostId: string,
    dto: UpdateListingDto,
  ): Promise<Listing> {
    const listing = await this.findById(id);

    if (listing.hostId !== hostId) {
      throw new ForbiddenException('You can only edit your own listings');
    }

    const updateData: any = { ...dto };

    if (dto.amenities) {
      updateData.amenities = JSON.stringify(dto.amenities);
    }

    await this.listingRepository.update(id, updateData);
    return this.findById(id);
  }

  async publish(id: string, hostId: string): Promise<Listing> {
    const listing = await this.findById(id);

    if (listing.hostId !== hostId) {
      throw new ForbiddenException('You can only publish your own listings');
    }

    await this.listingRepository.update(id, { status: ListingStatus.ACTIVE });
    return this.findById(id);
  }

  async pause(id: string, hostId: string): Promise<Listing> {
    const listing = await this.findById(id);

    if (listing.hostId !== hostId) {
      throw new ForbiddenException('You can only pause your own listings');
    }

    await this.listingRepository.update(id, { status: ListingStatus.PAUSED });
    return this.findById(id);
  }

  async delete(id: string, hostId: string): Promise<void> {
    const listing = await this.findById(id);

    if (listing.hostId !== hostId) {
      throw new ForbiddenException('You can only delete your own listings');
    }

    await this.listingRepository.delete(id);
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.listingRepository.increment({ id }, 'viewCount', 1);
  }

  async getFeatured(limit = 8) {
    return this.listingRepository.find({
      where: { status: ListingStatus.ACTIVE },
      relations: ['images', 'host', 'host.profile'],
      order: { viewCount: 'DESC' },
      take: limit,
    });
  }
}
