import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/auth.controller';
import { UserRepository } from './repository/auth-repository.service';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './service/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    UserRepository,
  ],
  exports: ['IUserService'],
})
export class UserModule {}
