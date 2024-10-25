import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE", "HEADER"]
  })

  await app.listen(8080);
}
bootstrap();
