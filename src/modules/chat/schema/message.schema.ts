import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  message: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ChatRoom',
    required: true,
  })
  chatRoomId: string;
}

export const messageSchema = SchemaFactory.createForClass(Message);
