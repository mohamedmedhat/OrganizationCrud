import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { UserModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrganizationModule } from './modules/organizer/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGO_DB_URI'),
      }),
    }),
    CacheModule.register({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const storeOptions =
          process.env.NODE_ENV === 'development'
            ? {
                socket: {
                  host: config.getOrThrow<string>('REDIS_HOST'),
                  port: config.getOrThrow<number>('REDIS_PORT'),
                },
              }
            : {
                url: config.getOrThrow<string>('REDIS_URL'),
              };
        const store = await redisStore(storeOptions);
        return {
          store,
          ttl: config.getOrThrow<number>('CACHE_TTL'),
        };
      },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        global: true,
      }),
    }),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        defaultStrategy: 'jwt',
      }),
    }),
    UserModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
