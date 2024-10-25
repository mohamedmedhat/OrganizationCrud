import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type InvitationDocument = Document & Invitation;

@Schema({ timestamps: true })
export class Invitation {
  [x: string]: any;
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  inviteStatus: string;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
