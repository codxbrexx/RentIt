import { IsString, IsUUID, IsOptional, MaxLength } from 'class-validator';

export class CreateConversationDto {
  @IsUUID()
  recipientId: string;

  @IsOptional()
  @IsUUID()
  listingId?: string;

  @IsString()
  @MaxLength(1000)
  message: string;
}

export class SendMessageDto {
  @IsString()
  @MaxLength(1000)
  content: string;
}
