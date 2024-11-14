import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IOrganizationService } from 'src/common/interface/organization-service.interface';
import { CreateOrganizationRequestDto } from '../dto/request/create-organization-request.dto';
import { CreateOrganizationResponseDto } from '../dto/response/create-organization-response.dto';
import { Organization } from '../schema/organization.schema';
import { OrganizationPaginationResponseDto } from '../dto/response/organizations-pagination-response.dto';
import { UpdateOrganizationRequestDto } from '../dto/request/update-organization-request.dto';
import { UpdateOrganizationResponseDto } from '../dto/response/update-organization-response.dto';
import { DeleteUserFromOrganizationResponseDto } from '../dto/response/delete-usesr-response.dto';
import { InvitingUsersResponseDto } from '../dto/response/inviting-users-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { InvitingUsersRequestDto } from '../dto/request/inviting-user-request.dto';
import { PaginationInvitiationsResponseDto } from '../dto/response/invitations-pagination-response.dto';

@Controller('/organization/')
export class OrganizationController {
  constructor(
    @Inject('IOrganizationService')
    private readonly _organizationService: IOrganizationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrganization(
    @Body() organizationData: CreateOrganizationRequestDto,
  ): Promise<CreateOrganizationResponseDto> {
    return await this._organizationService.createOrganization(organizationData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOrganization(
    @Param('id') id: string,
    @Body() organizationData: UpdateOrganizationRequestDto,
  ): Promise<UpdateOrganizationResponseDto> {
    return await this._organizationService.updateOrganization(
      id,
      organizationData,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOrganization(
    @Param('id') id: string,
  ): Promise<DeleteUserFromOrganizationResponseDto> {
    return await this._organizationService.deleteOrganization(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrganizationById(@Param('id') id: string): Promise<Organization> {
    return await this._organizationService.getOrganization(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllOrganizations(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<OrganizationPaginationResponseDto> {
    return await this._organizationService.getAllOrganizations(page, size);
  }

  @UseGuards(JwtAuthGuard)
  @Get('invitations')
  async getAllInvitations(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<PaginationInvitiationsResponseDto> {
    return await this._organizationService.getAllInvitations(page, size);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/invite')
  async inviteUserToOrganization(
    @Param('id') id: string,
    @Body() email: InvitingUsersRequestDto,
  ): Promise<InvitingUsersResponseDto> {
    return await this._organizationService.inviteUserToOrganization(id, email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('accept')
  async acceptInvitation(
    @Query('invitationId') invitationId: string,
  ): Promise<InvitingUsersResponseDto> {
    return this._organizationService.acceptInvitation(invitationId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('cancel')
  async CancelInvitation(
    @Query('invitationId') invitationId: string,
  ): Promise<InvitingUsersResponseDto> {
    return this._organizationService.refuseInvitation(invitationId);
  }
}
