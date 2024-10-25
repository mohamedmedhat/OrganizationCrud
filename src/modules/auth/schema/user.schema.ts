import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = Document & User;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], default: [] })
  role: string[];

  @Prop({type:{type: Types.ObjectId, ref: 'Organization'}})
  organization: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
