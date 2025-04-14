import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AdminFactory } from 'test/factories/make-admin';
import { AttachmentFactory } from 'test/factories/make-attachment';

describe('create project (e2e)', () => {
  let app: INestApplication;
  let adminFactory: AdminFactory;
  let prisma: PrismaService;
  let jwt: JwtService;
  let attachmentFactory: AttachmentFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, AttachmentFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    adminFactory = moduleRef.get(AdminFactory);
    jwt = moduleRef.get(JwtService);
    attachmentFactory = moduleRef.get(AttachmentFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /projects', async () => {
    const user = await adminFactory.makePrismaAdmin();
    const accessToken = jwt.sign({ sub: user.id.toString() });

    const attachment1 = await attachmentFactory.makePrismaAttachment();
    const attachment2 = await attachmentFactory.makePrismaAttachment();

    const response = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'New Project',
        description: 'Project description',
        repositoryLink: 'link',
        attachmentsIds: [attachment1.id.toString(), attachment2.id.toString()],
      });

    expect(response.statusCode).toEqual(201);

    const projectOnDatabase = await prisma.project.findFirst({
      where: {
        title: 'New Project',
      },
    });

    expect(projectOnDatabase).toBeTruthy();

    const attachmentsOnDatabase = await prisma.attachment.findMany({
      where: {
        projectId: projectOnDatabase?.id,
      },
    });

    expect(attachmentsOnDatabase).toHaveLength(2);
  });
});
