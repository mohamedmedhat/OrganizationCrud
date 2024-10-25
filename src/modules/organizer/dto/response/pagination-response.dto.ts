import { Organization } from '../../model/organization.model';

export class OrganizationPaginationResponseDto {
  organizations: Organization[];
  total_organizations: number;
}
