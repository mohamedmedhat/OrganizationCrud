import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organization } from "../model/organization.model";
import { Model } from "mongoose";


@Injectable()
export class OrganizationRepository {
    constructor(@InjectModel(Organization.name) private readonly _organizationModel: Model<Organization>){}
}