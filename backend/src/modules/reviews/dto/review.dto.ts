import {
  IsString,
  IsNumber,
  Min,
  Max,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  bookingId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @MaxLength(1000)
  comment: string;
}

export class HostReplyDto {
  @IsString()
  @MaxLength(500)
  reply: string;
}
