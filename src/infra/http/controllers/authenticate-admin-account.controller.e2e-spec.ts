import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { AdminFactory } from 'test/factories/make-admin';

describe('authenticate admin (e2e)', () => {
  let app: INestApplication;
  let adminFactory: AdminFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(AdminFactory);

    await app.init();
  });

  test('[POST] /sessions/admin', async () => {
    await adminFactory.makePrismaAdmin({
      email: 'johndoe@gmail.com',
      password: await hash('123456', 8),
    });

    const response = await request(app.getHttpServer())
      .post('/sessions/admin')
      .send({
        email: 'johndoe@gmail.com',
        password: '123456',
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
