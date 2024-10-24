import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schema/user.schema";
import { Model } from "mongoose";
import { RegisterRequestDto } from "../dto/request/create/create-user.dto";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

    async addUser(userData: RegisterRequestDto){
        const user = new this.userModel(userData);
        return user.save();
    }
}