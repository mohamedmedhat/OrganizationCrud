import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/auth.controller';
import { UserRepository } from './repository/auth-repository.service';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken, RefreshTokenSchema } from './schema/token.schema';
import { JwtRefreshStrategy } from 'src/utils/stratigies/refresh-jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    UserRepository,
    JwtRefreshStrategy
  ],
  exports: ['IUserService'],
})
export class UserModule {}
