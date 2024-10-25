import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { RegisterRequestDto } from '../dto/request/create/create-user.dto';
import { RefreshToken } from '../schema/token.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokeModel: Model<RefreshToken>,
  ) {}

  async addUser(userData: RegisterRequestDto) {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('User Not Found');
    return user;
  }

  async findUserById(id: string): Promise<UserDocument> {
    const usr = await this.userModel.findById(id).exec();
    if (!usr) throw new BadRequestException('User Not Found');
    return usr;
  }

  async createRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<RefreshToken> {
    const refreshToken = new this.refreshTokeModel({
      userId,
      token,
      expiresAt,
    });
    return await refreshToken.save();
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return await this.refreshTokeModel.findOne({ token, revoked: false });
  }

  async revokeToken(token: string): Promise<void> {
    await this.refreshTokeModel.updateOne({ token }, { revoked: true });
  }

  async deleteExpiredTokens(): Promise<void> {
    await this.refreshTokeModel.deleteMany({ expiresAt: { $lt: new Date() } });
  }
}
