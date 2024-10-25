import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationResponseDto {
  @IsString()
  @IsNotEmpty()
  organization_id: string;

  constructor(organization_id: string) {
    this.organization_id = organization_id;
  }
}
