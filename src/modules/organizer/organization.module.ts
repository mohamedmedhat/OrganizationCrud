import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './model/organization.model';
import { OrganizationService } from './service/organization.service';
import { OrganizationRepository } from './repository/organization.repository';
import { OrganizationController } from './controller/organization.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  providers: [
    {
      provide: 'IOrganizationService',
      useClass: OrganizationService,
    },
    OrganizationRepository,
  ],
  controllers: [OrganizationController],
  exports: ['IOrganizationService'],
})
export class OrganizationModule {}
