import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/common/interface/user-service.interface';
import { RegisterRequestDto } from '../dto/request/create/create-user.dto';
import { LoginRequestDto } from '../dto/request/create/login-user.dto';
import { LoginResponseDto } from '../dto/response/login-response.dto';
import { RefreshTokenResponseDto } from '../dto/response/refresh-token-response.do';
import { RegisterResponseDto } from '../dto/response/register-response.dto';
import { UserRepository } from '../repository/auth-repository.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly _userRepo: UserRepository,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(
    rawPassword: string,
    hashedPassowrd: string,
  ): Promise<boolean> {
    return bcrypt.compare(rawPassword, hashedPassowrd);
  }

  async register(userData: RegisterRequestDto): Promise<RegisterResponseDto> {
    const securePassword = await this.hashPassword(userData.password);
    const newUser: RegisterRequestDto = {
      name: userData.name,
      email: userData.email,
      password: securePassword,
      roles: userData.roles.map((r) => r.toLowerCase()),
    };
    await this._userRepo.addUser(newUser);
    return new RegisterResponseDto('signup successfully');
  }

  login(userData: LoginRequestDto): Promise<LoginResponseDto> {
    throw new Error('Method not implemented.');
  }
  refreshToken(refreshToken: string): Promise<RefreshTokenResponseDto> {
    throw new Error('Method not implemented.');
  }
}
