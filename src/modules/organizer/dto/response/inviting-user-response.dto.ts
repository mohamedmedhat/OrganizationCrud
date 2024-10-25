import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class InviteUserDto {
  @IsNotEmpty()
  @IsMongoId()
  organizationId: string;

  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsOptional()
  inviteStatus?: string = 'pending';
}
