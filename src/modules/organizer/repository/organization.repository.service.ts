import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Organization } from '../schema/organization.schema';
import { Model, Types } from 'mongoose';
import { CreateOrganizationRequestDto } from '../dto/request/create-organization-request.dto';
import { UpdateOrganizationRequestDto } from '../dto/request/update-organization-request.dto';
import { InviteUserDto } from '../dto/response/inviting-user-response.dto';
import { Invitation } from '../schema/invitation.schema';
import { PaginationInvitiationsResponseDto } from '../dto/response/invitations-pagination-response.dto';

@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectModel(Organization.name)
    private readonly _organizationModel: Model<Organization>,
    @InjectModel(Invitation.name)
    private readonly _invitationModel: Model<Invitation>,
  ) {}

  async addOrganization(
    organizationData: CreateOrganizationRequestDto,
  ): Promise<Organization> {
    const newOrg = new this._organizationModel(organizationData);
    return await newOrg.save();
  }

  async findOrganizationById(id: string): Promise<Organization> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId format');
    }
    const org = await this._organizationModel
      .findById(id)
      .populate({
        path: 'members.user',
        select: 'name email',
      })
      .exec();
    if (!org) {
      throw new BadRequestException('Organization not found');
    }
    return org;
  }

  async findAllOrganizations(
    page: number,
    size: number,
  ): Promise<[Organization[], number]> {
    const totalOrganizations = await this._organizationModel.countDocuments();
    const organizations = await this._organizationModel
      .find()
      .skip((page - 1) * size)
      .limit(size)
      .populate({
        path: 'members.user',
        select: 'name email',
      });
    return [organizations, totalOrganizations];
  }

  async updateOrganization(
    id: string,
    organizationData: UpdateOrganizationRequestDto,
  ): Promise<Organization> {
    const updatedOrganization = await this._organizationModel.findByIdAndUpdate(
      id,
      organizationData,
      {
        new: true,
        useFindAndModify: false,
      },
    );
    if (!updatedOrganization) {
      throw new NotFoundException('Organization not found');
    }
    return updatedOrganization;
  }

  async deleteOrganization(id: string): Promise<void> {
    const result = await this._organizationModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Organization not found');
    }
  }

  async sendInvitation(invite: InviteUserDto) {
    const invitation = new this._invitationModel({
      organization: invite.organizationId,
      user: invite.userId,
      inviteStatus: invite.inviteStatus || 'pending',
    });
    return await invitation.save();
  }

  async findInvitationById(id: string): Promise<Invitation> {
    const invite = await this._invitationModel.findById(id);
    if (!invite) {
      throw new NotFoundException('Invitation Not Found');
    }
    return invite;
  }

  async changeInvitationStatues(invit: Invitation, statues: string) {
    invit.inviteStatus = statues;
    return await invit.save();
  }

  async addUserToOrganization(invit: Invitation): Promise<void> {
    await this._organizationModel.findByIdAndUpdate(invit.organization, {
      $addToSet: { members: { user: invit.user, access_level: 'viewer' } },
    });
  }

  async findAllInvitations(
    page: number,
    size: number,
  ): Promise<PaginationInvitiationsResponseDto> {
    const total_invitaions = await this._invitationModel.countDocuments();
    const invitations = await this._invitationModel
      .find()
      .skip((page - 1) * size)
      .limit(size);
    return new PaginationInvitiationsResponseDto(invitations, total_invitaions);
  }
}
