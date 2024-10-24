import { RegisterRequestDto } from 'src/modules/auth/dto/request/create/create-user.dto';
import { LoginRequestDto } from 'src/modules/auth/dto/request/create/login-user.dto';
import { LoginResponseDto } from 'src/modules/auth/dto/response/login-response.dto';
import { RefreshTokenResponseDto } from 'src/modules/auth/dto/response/refresh-token-response.do';
import { RegisterResponseDto } from 'src/modules/auth/dto/response/register-response.dto';

export interface IUserService {
  register(userData: RegisterRequestDto): Promise<RegisterResponseDto>;
  login(userData: LoginRequestDto): Promise<LoginResponseDto>;
  refreshToken(refreshToken: string): Promise<RefreshTokenResponseDto>;
}
