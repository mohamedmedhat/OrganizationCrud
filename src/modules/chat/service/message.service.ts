import { Injectable } from "@nestjs/common";
import { MessageRepository } from "../repository/message-repository.service";


@Injectable()
export class MessageService{
    constructor(
        private readonly _messageRepo: MessageRepository
    ){}
}