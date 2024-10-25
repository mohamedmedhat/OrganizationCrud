import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrganizationRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
