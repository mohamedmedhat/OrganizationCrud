import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/modules/auth/repository/auth-repository.service';
import { User } from 'src/modules/auth/schema/user.schema';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly _userRepo: UserRepository,
    private readonly _configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload: any): Promise<User> {
    return this._userRepo.findUserById(payload._id);
  }
}
