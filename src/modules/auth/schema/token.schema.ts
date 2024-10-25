import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type rerfreshTokenDocument = Document & RefreshToken;

@Schema()
export class RefreshToken {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: false })
  revoked: boolean;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
