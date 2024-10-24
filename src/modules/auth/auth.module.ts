import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";
import { UserController } from "./controller/auth.controller";
import { UserService } from "./service/auth.service";


@Module({
    imports:[
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule{}