import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUserService } from 'src/common/interface/user-service.interface';
import { RegisterRequestDto } from '../dto/request/create/create-user.dto';
import { RegisterResponseDto } from '../dto/response/register-response.dto';
import { LoginRequestDto } from '../dto/request/create/login-user.dto';
import { LoginResponseDto } from '../dto/response/login-response.dto';
import { RefreshTokenResponseDto } from '../dto/response/refresh-token-response.do';

@Controller('/')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly _userService: IUserService,
  ) {}

  @Post('signup')
  async signup(
    @Body() userData: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this._userService.register(userData);
  }

  @Post('/signin')
  async signin(@Body() userDate: LoginRequestDto): Promise<LoginResponseDto> {
    return this._userService.login(userDate);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() token: string): Promise<RefreshTokenResponseDto> {
    return this._userService.refreshToken(token);
  }
}
