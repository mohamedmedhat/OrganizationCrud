import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory:(config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGO_DB_URI')
      })
    }),
    CacheModule.register({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          ttl: config.getOrThrow<number>('CACHE_TTL'),
          socket: {
            host: config.getOrThrow<string>('REDIS_HOST'),
            port: config.getOrThrow<number>('REDIS_PORT'),
          }
        });
        return { store }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
