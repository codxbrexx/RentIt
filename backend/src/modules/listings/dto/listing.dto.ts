import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsArray,
  Min,
  MaxLength,
} from 'class-validator';

export enum ListingCategory {
  HOUSE = 'house',
  HOTEL = 'hotel',
  VEHICLE = 'vehicle',
  EQUIPMENT = 'equipment',
  EVENT = 'event',
}

export class CreateListingDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsEnum(ListingCategory)
  category: ListingCategory;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsNumber()
  @Min(0)
  basePrice: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  priceUnit?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  minDuration?: number;

  @IsOptional()
  @IsNumber()
  maxDuration?: number;

  @IsOptional()
  @IsBoolean()
  instantBook?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsString()
  rules?: string;

  @IsOptional()
  @IsString()
  cancellationPolicy?: string;

  @IsOptional()
  @IsArray()
  images?: { url: string; caption?: string }[];
}

export class UpdateListingDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsEnum(ListingCategory)
  category?: ListingCategory;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  basePrice?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  priceUnit?: string;

  @IsOptional()
  @IsNumber()
  minDuration?: number;

  @IsOptional()
  @IsNumber()
  maxDuration?: number;

  @IsOptional()
  @IsBoolean()
  instantBook?: boolean;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsString()
  rules?: string;

  @IsOptional()
  @IsString()
  cancellationPolicy?: string;
}

export class ListingQueryDto {
  @IsOptional()
  @IsEnum(ListingCategory)
  category?: ListingCategory;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
