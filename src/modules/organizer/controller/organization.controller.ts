import { Controller, Inject } from '@nestjs/common';
import { IOrganizationService } from 'src/common/interface/organization-service.interface';

@Controller('/organization/')
export class OrganizationController {
  constructor(
    @Inject('IOrganizationService')
    private readonly _organizationService: IOrganizationService,
  ) {}
}
