import { CreateOrganizationRequestDto } from "src/modules/organizer/dto/request/create-organization-request.dto";
import { InvitingUsersRequestDto } from "src/modules/organizer/dto/request/inviting-user-request.dto";
import { UpdateOrganizationRequestDto } from "src/modules/organizer/dto/request/update-organization-request.dto";
import { CreateOrganizationResponseDto } from "src/modules/organizer/dto/response/create-organization-response.dto";
import { DeleteUserFromOrganizationResponseDto } from "src/modules/organizer/dto/response/delete-usesr-response.dto";
import { PaginationInvitiationsResponseDto } from "src/modules/organizer/dto/response/invitations-pagination-response.dto";
import { InvitingUsersResponseDto } from "src/modules/organizer/dto/response/inviting-users-response.dto";
import { OrganizationPaginationResponseDto } from "src/modules/organizer/dto/response/organizations-pagination-response.dto";
import { UpdateOrganizationResponseDto } from "src/modules/organizer/dto/response/update-organization-response.dto";
import { Organization } from "src/modules/organizer/schema/organization.schema";

export interface IOrganizationService {
    createOrganization(organizationData: CreateOrganizationRequestDto): Promise<CreateOrganizationResponseDto>;
    updateOrganization(id: string, organizationData: UpdateOrganizationRequestDto): Promise<UpdateOrganizationResponseDto>;
    deleteOrganization(id: string): Promise<DeleteUserFromOrganizationResponseDto>;
    getOrganization(id: string): Promise<Organization>;
    getAllOrganizations(page: number, size: number): Promise<OrganizationPaginationResponseDto>;    
    inviteUserToOrganization(id: string, email: InvitingUsersRequestDto): Promise<InvitingUsersResponseDto>;
    acceptInvitation(invitationId: string): Promise<InvitingUsersResponseDto>;
    refuseInvitation(invitationId: string): Promise<InvitingUsersResponseDto>;
    getAllInvitations(page: number, size: number): Promise<PaginationInvitiationsResponseDto>;    
}
