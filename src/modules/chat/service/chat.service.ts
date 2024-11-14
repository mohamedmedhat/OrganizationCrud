import { Injectable } from "@nestjs/common";
import { ChatRepository } from "../repository/chat-repository.service";


@Injectable()
export class ChatService{
    constructor(
        private readonly _chatRepo: ChatRepository
    ){}
}