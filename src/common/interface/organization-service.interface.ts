import { CreateOrganizationRequestDto } from "src/modules/organizer/dto/request/create-organization-request.dto";
import { UpdateOrganizationRequestDto } from "src/modules/organizer/dto/request/update-organization-request.dto";
import { CreateOrganizationResponseDto } from "src/modules/organizer/dto/response/create-organization-response.dto";
import { DeleteUserFromOrganizationResponseDto } from "src/modules/organizer/dto/response/delete-usesr-response.dto";
import { InvitingUsersResponseDto } from "src/modules/organizer/dto/response/inviting-users-response.dto";
import { UpdateOrganizationResponseDto } from "src/modules/organizer/dto/response/update-organization-response.dto";
import { Organization } from "src/modules/organizer/model/organization.model";

export interface IOrganizationService {
    createOrganization(organizationData: CreateOrganizationRequestDto): Promise<CreateOrganizationResponseDto>;
    updateOrganization(organizationData: UpdateOrganizationRequestDto): Promise<UpdateOrganizationResponseDto>;
    deleteOrganization(id: string): Promise<DeleteUserFromOrganizationResponseDto>;
    getOrganization(id: string): Promise<Organization>;
    getAllOrganizations(page: number, size: number): Promise<[Organization[], number]>;
    inviteUserToOrganization(email: string): Promise<InvitingUsersResponseDto>;
}