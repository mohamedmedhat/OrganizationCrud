import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IOrganizationService } from 'src/common/interface/organization-service.interface';
import { CreateOrganizationRequestDto } from '../dto/request/create-organization-request.dto';
import { UpdateOrganizationRequestDto } from '../dto/request/update-organization-request.dto';
import { CreateOrganizationResponseDto } from '../dto/response/create-organization-response.dto';
import { DeleteUserFromOrganizationResponseDto } from '../dto/response/delete-usesr-response.dto';
import { InvitingUsersResponseDto } from '../dto/response/inviting-users-response.dto';
import { UpdateOrganizationResponseDto } from '../dto/response/update-organization-response.dto';
import {
  Organization,
  OrganizationDocument,
} from '../model/organization.model';
import { OrganizationRepository } from '../repository/organization.repository.service';
import { OrganizationPaginationResponseDto } from '../dto/response/organizations-pagination-response.dto';
import { InvitingUsersRequestDto } from '../dto/request/inviting-user-request.dto';
import { UserRepository } from 'src/modules/auth/repository/auth-repository.service';
import { PaginationInvitiationsResponseDto } from '../dto/response/invitations-pagination-response.dto';

@Injectable()
export class OrganizationService implements IOrganizationService {
  constructor(
    @Inject(forwardRef(() => OrganizationRepository))
    private readonly _organizationRepo: OrganizationRepository,
    @Inject(forwardRef(() => UserRepository))
    private readonly _userRepo: UserRepository,
  ) {}

  async createOrganization(
    organizationData: CreateOrganizationRequestDto,
  ): Promise<CreateOrganizationResponseDto> {
    const organization = (await this._organizationRepo.addOrganization(
      organizationData,
    )) as OrganizationDocument;
    return new CreateOrganizationResponseDto(organization._id.toString());
  }

  async updateOrganization(
    id: string,
    organizationData: UpdateOrganizationRequestDto,
  ): Promise<UpdateOrganizationResponseDto> {
    const organization = (await this._organizationRepo.updateOrganization(
      id,
      organizationData,
    )) as OrganizationDocument;
    return new UpdateOrganizationResponseDto(
      organization._id.toString(),
      organization.name,
      organization.description,
    );
  }

  async deleteOrganization(
    id: string,
  ): Promise<DeleteUserFromOrganizationResponseDto> {
    await this._organizationRepo.deleteOrganization(id);
    return new DeleteUserFromOrganizationResponseDto(
      'Organization had been deleted successfully',
    );
  }

  async getOrganization(id: string): Promise<Organization> {
    return await this._organizationRepo.findOrganizationById(id);
  }

  async getAllOrganizations(
    page: number,
    size: number,
  ): Promise<OrganizationPaginationResponseDto> {
    return await this._organizationRepo.findAllOrganizations(page, size);
  }

  async inviteUserToOrganization(
    id: string,
    invitingBody: InvitingUsersRequestDto,
  ): Promise<InvitingUsersResponseDto> {
    const organization = await this._organizationRepo.findOrganizationById(id);
    const user = await this._userRepo.findUserByEmail(invitingBody.email);
    if (organization && user) {
      await this._organizationRepo.sendInvitation({
        organizationId: id,
        userId: user._id.toString(),
        inviteStatus: 'pending',
      });
      return new InvitingUsersResponseDto('Invitation was sent successfully');
    }
    throw new BadRequestException('inviteUserToOrganization failed');
  }

  async acceptInvitation(invitationId: string): Promise<InvitingUsersResponseDto>{
    const invite= await this._organizationRepo.findInvitationById(invitationId);
    await Promise.all([
        this._organizationRepo.changeInvitationStatues(invite, 'accepted'),
        this._organizationRepo.addUserToOrganization(invite)
    ])
    return new InvitingUsersResponseDto("Invitation has been accepted successfully");
  }

  async refuseInvitation(invitationId: string): Promise<InvitingUsersResponseDto>{
    const invite= await this._organizationRepo.findInvitationById(invitationId);
    await this._organizationRepo.changeInvitationStatues(invite, 'canceled');
    return new InvitingUsersResponseDto("Invitation has been canceled successfully");
  }

  async getAllInvitations(
    page: number,
    size: number,
  ): Promise<PaginationInvitiationsResponseDto> {
    return await this._organizationRepo.findAllInvitations(page, size);
  }
}

