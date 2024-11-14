import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrganizationDocument = Document & Organization;

@Schema({ timestamps: true })
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: [
      {
        user: { type: Types.ObjectId, ref: 'User' },
        access_level: {
          type: String,
          enum: ['admin', 'editor', 'viewer'],
          default: 'viewer',
        },
      },
    ],
    required: false
  })
  members: { user: Types.ObjectId; access_level: string }[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
