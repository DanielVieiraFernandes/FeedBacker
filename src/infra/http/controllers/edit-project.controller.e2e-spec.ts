import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AdminFactory } from 'test/factories/make-admin';
import { AttachmentFactory } from 'test/factories/make-attachment';
import { ProjectFactory } from 'test/factories/make-project';

describe('edit project (e2e)', () => {
  let app: INestApplication;
  let adminFactory: AdminFactory;
  let prisma: PrismaService;
  let jwt: JwtService;
  let projectFactory: ProjectFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, ProjectFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(AdminFactory);
    jwt = moduleRef.get(JwtService);
    projectFactory = moduleRef.get(ProjectFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[PUT] /projects/:projectId', async () => {
    const user = await adminFactory.makePrismaAdmin();
    const accessToken = jwt.sign({ sub: user.id.toString() });

    const project = await projectFactory.makePrismaProject({
      authorId: user.id,
    });

    const response = await request(app.getHttpServer())
      .put(`/projects/${project.id.toValue()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'New Project',
        description: 'Project description',
        repositoryLink: 'link.com',
        attachmentsIds: ['1', '2'],
      });

      expect(response.statusCode).toEqual(200)
  });
});
