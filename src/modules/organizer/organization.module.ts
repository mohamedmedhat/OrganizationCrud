import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './model/organization.model';
import { OrganizationService } from './service/organization.service';
import { OrganizationRepository } from './repository/organization.repository.service';
import { OrganizationController } from './controller/organization.controller';
import { Invitation, InvitationSchema } from './model/invitation.model';
import { UserModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: Invitation.name, schema: InvitationSchema },
    ]),
    UserModule,
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
