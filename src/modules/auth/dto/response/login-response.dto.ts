import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsString()
  @IsNotEmpty()
  refresh_token: string;

  constructor(message: string, access_token: string, refresh_token: string) {
    this.message = message;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}
