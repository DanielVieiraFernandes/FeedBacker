import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { MemberFactory } from 'test/factories/make-member';

describe('authenticate member (e2e)', () => {
  let app: INestApplication;
  let memberFactory: MemberFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MemberFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    memberFactory = moduleRef.get(MemberFactory);

    await app.init();
  });

  test('[POST] /sessions/member', async () => {
    await memberFactory.makePrismaMember({
      email: 'johndoe@gmail.com',
      password: await hash('123456', 8),
    });

    const response = await request(app.getHttpServer())
      .post('/sessions/member')
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
