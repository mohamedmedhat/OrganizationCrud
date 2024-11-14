import { Organization } from '../../schema/organization.schema';

export class OrganizationPaginationResponseDto {
  organizations: Organization[];
  total_organizations: number;

  constructor(organizations: Organization[], total_organizations: number) {
    this.organizations = organizations;
    this.total_organizations = total_organizations;
  }
}
