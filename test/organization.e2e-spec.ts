import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('Organization E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(process.env.MONGO_DB_URI), // Test DB
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/organization (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/organization')
      .query({ page: 1, size: 10 })
      .expect(200);

    expect(response.body).toHaveProperty('organizations');
    expect(response.body).toHaveProperty('totalOrganizations');
    expect(Array.isArray(response.body.organizations)).toBe(true);
    expect(response.body.organizations.length).toBeGreaterThan(0);
  });
});
