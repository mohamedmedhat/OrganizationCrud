import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, messageSchema } from './schema/message.schema';
import { ChatRoom, ChatRoomSchema } from './schema/chat.schema';
import { ChatService } from './service/chat.service';
import { MessageService } from './service/message.service';
import { ChatRepository } from './repository/chat-repository.service';
import { MessageRepository } from './repository/message-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: messageSchema },
      { name: ChatRoom.name, schema: ChatRoomSchema },
    ]),
  ],
  providers: [ChatService, MessageService, ChatRepository, MessageRepository],
})
export class ChatModule {}
