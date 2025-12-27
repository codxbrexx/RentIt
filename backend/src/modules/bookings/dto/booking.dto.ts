import { IsString, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  listingId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  message?: string;
}

export class UpdateBookingStatusDto {
  @IsString()
  status: 'confirmed' | 'rejected' | 'cancelled';

  @IsOptional()
  @IsString()
  reason?: string;
}
