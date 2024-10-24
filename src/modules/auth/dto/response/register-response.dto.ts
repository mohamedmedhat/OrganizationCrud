import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
