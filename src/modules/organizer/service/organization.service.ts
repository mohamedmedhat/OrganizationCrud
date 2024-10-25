import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { IOrganizationService } from "src/common/interface/organization-service.interface";
import { CreateOrganizationRequestDto } from "../dto/request/create-organization-request.dto";
import { UpdateOrganizationRequestDto } from "../dto/request/update-organization-request.dto";
import { CreateOrganizationResponseDto } from "../dto/response/create-organization-response.dto";
import { DeleteUserFromOrganizationResponseDto } from "../dto/response/delete-usesr-response.dto";
import { InvitingUsersResponseDto } from "../dto/response/inviting-users-response.dto";
import { UpdateOrganizationResponseDto } from "../dto/response/update-organization-response.dto";
import { Organization } from "../model/organization.model";
import { OrganizationRepository } from "../repository/organization.repository";

@Injectable()
export class OrganizationService implements IOrganizationService{
    constructor(@Inject(forwardRef(() => OrganizationRepository)) private readonly _organizationRepo: OrganizationRepository){}

    createOrganization(organizationData: CreateOrganizationRequestDto): Promise<CreateOrganizationResponseDto> {
        throw new Error("Method not implemented.");
    }
    updateOrganization(organizationData: UpdateOrganizationRequestDto): Promise<UpdateOrganizationResponseDto> {
        throw new Error("Method not implemented.");
    }
    deleteOrganization(id: string): Promise<DeleteUserFromOrganizationResponseDto> {
        throw new Error("Method not implemented.");
    }
    getOrganization(id: string): Promise<Organization> {
        throw new Error("Method not implemented.");
    }
    getAllOrganizations(page: number, size: number): Promise<[Organization[], number]> {
        throw new Error("Method not implemented.");
    }
    inviteUserToOrganization(email: string): Promise<InvitingUsersResponseDto> {
        throw new Error("Method not implemented.");
    }
}