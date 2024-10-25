import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/common/interface/user-service.interface';
import { RegisterRequestDto } from '../dto/request/create/create-user.dto';
import { LoginRequestDto } from '../dto/request/create/login-user.dto';
import { LoginResponseDto } from '../dto/response/login-response.dto';
import { RefreshTokenResponseDto } from '../dto/response/refresh-token-response.do';
import { RegisterResponseDto } from '../dto/response/register-response.dto';
import { UserRepository } from '../repository/auth-repository.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from '../schema/user.schema';
import { RevokeTokenResponseDto } from '../dto/response/invoke-token-response.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly _userRepo: UserRepository,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async generateAuthToken(
    user: UserDocument,
    secretKey: string,
    expiresIn: string,
  ): Promise<string> {
    const payload = {
      _id: user._id.toString(),
      email: user.email,
    };
    return this._jwtService.sign(payload, {
        secret: this._configService.getOrThrow<string>(secretKey),
        expiresIn,
      });
  }

  async verifyToken(token: string, key: string){
    return this._jwtService.verifyAsync(token, {
        secret: this._configService.getOrThrow<string>(key)
    })
  }

  async verifyRefreshToken(token: string){
    return this.verifyToken(token, 'JWT_REFRESH_SECRET');
  }

  async validateAccessToken(token: string){
    return this.verifyToken(token, 'JWT_ACCESS_SECRET');
  }

  async hashItem(item: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(item, salt);
  }

  async hashRefreshToken(token: string): Promise<string> {
    return this.hashItem(token);
  }

  async hashPassword(password: string): Promise<string> {
    return this.hashItem(password);
  }

  async comparePasswords(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(rawPassword, hashedPassword);
  }

  async compareRefreshToken(
    storedToken: string,
    providedToken: string,
  ): Promise<boolean> {
    return bcrypt.compare(providedToken, storedToken);
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

  async login(userData: LoginRequestDto): Promise<LoginResponseDto> {
   try{
    const user: UserDocument  = await this._userRepo.findUserByEmail(userData.email);
    const password = await this.comparePasswords(userData.password, user.password);
    if(user && password){
        const access_token = await this.generateAuthToken(user, "JWT_ACCESS_SECRET", '1d');
        const refresh_token = await this.generateAuthToken(user, "JWT_REFRESH_SECRET", '7d');
        await this._userRepo.createRefreshToken(user._id.toString(), refresh_token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        return new LoginResponseDto("login successfully", access_token, refresh_token); 
    }
   }catch(error){
    throw new BadRequestException(`login failed: ${error.message}`);
   }
  }


  async refreshToken(refreshToken: string): Promise<RefreshTokenResponseDto> {
    if (typeof refreshToken !== 'string' || !refreshToken.trim()) {
        throw new BadRequestException('Invalid refresh token');
    }
    const payload = await this.verifyRefreshToken(refreshToken);
    const storedToken = await this._userRepo.findByToken(refreshToken);
    if (!storedToken) {
        throw new BadRequestException('Refresh token has been revoked or does not exist');
    }
    const user = await this._userRepo.findUserById(payload._id);
    const accessToken = await this.generateAuthToken(user, "JWT_ACCESS_SECRET", '1d');
    const newRefreshToken = await this.generateAuthToken(user, "JWT_REFRESH_SECRET", '7d');
    await this._userRepo.createRefreshToken(user._id.toString(), newRefreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    return new RefreshTokenResponseDto("Refresh Token successfully", accessToken, newRefreshToken);
  }

  async revokeRefreshToken(refreshToken: string): Promise<RevokeTokenResponseDto> {
    const token = await this._userRepo.findByToken(refreshToken);
    if(token){
        await this._userRepo.revokeToken(refreshToken)
        return new RevokeTokenResponseDto("token invoked successfully");
    }
    throw new BadRequestException('Token not found or already revoked');
  }
}
