import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/modules/auth/schema/user.schema";

export type OrganizationDocument = Document & Organization;

@Schema({timestamps: true})
export class Organization {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop()
    organization_members: User[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);