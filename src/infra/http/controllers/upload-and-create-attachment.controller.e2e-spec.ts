import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AdminFactory } from 'test/factories/make-admin';

describe('upload and create attachment (e2e)', () => {
  let app: INestApplication;

  let adminFactory: AdminFactory;

  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(AdminFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test.skip('[POST] /attachments', async () => { // Deixei skipado para não ficar fazendo upload no r2 
    const user = await adminFactory.makePrismaAdmin();
    const accessToken = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/attachments')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/images/anakin.jpeg');

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      attachmentId: expect.any(String),
    });
  });
});
