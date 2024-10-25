import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './model/organization.model';
import { OrganizationService } from './service/organization.service';
import { OrganizationRepository } from './repository/organization.repository.service';
import { OrganizationController } from './controller/organization.controller';
import { Invitation, InvitationSchema } from './model/invitation.model';
import { UserModule } from '../auth/auth.module';
import { CacheService } from 'src/shared/caching/cache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: Invitation.name, schema: InvitationSchema },
    ]),
    UserModule,
    CacheModule.register()
  ],
  providers: [
    {
      provide: 'IOrganizationService',
      useClass: OrganizationService,
    },
    OrganizationRepository,
    CacheService
  ],
  controllers: [OrganizationController],
  exports: ['IOrganizationService'],
})
export class OrganizationModule {}
