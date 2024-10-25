import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrganizationResponseDto {
  @IsString()
  @IsNotEmpty()
  organization_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(organization_id: string, name: string, description: string) {
    this.organization_id = organization_id;
    this.name = name;
    this.description = description;
  }
}
