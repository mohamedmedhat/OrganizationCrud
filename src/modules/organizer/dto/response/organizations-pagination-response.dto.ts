import { Organization } from '../../model/organization.model';

export class OrganizationPaginationResponseDto {
  organizations: Organization[];
  total_organizations: number;

  constructor(organizations: Organization[], total_organizations: number) {
    this.organizations = organizations;
    this.total_organizations = total_organizations;
  }
}
