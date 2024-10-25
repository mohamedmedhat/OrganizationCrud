import { IsEmail, IsNotEmpty } from 'class-validator';

export class InvitingUsersRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
