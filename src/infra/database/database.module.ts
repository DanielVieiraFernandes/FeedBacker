import { AdminRepository } from '@/domain/feedback/application/repositories/admin-repository';
import { AnswerRepository } from '@/domain/feedback/application/repositories/answer-repository';
import { AttachmentRepository } from '@/domain/feedback/application/repositories/attachment-repository';
import { FeedbackRepository } from '@/domain/feedback/application/repositories/feedback-repository';
import { MemberRepository } from '@/domain/feedback/application/repositories/member-repository';
import { ProjectAttachmentRepository } from '@/domain/feedback/application/repositories/project-attachment-repository';
import { ProjectRepository } from '@/domain/feedback/application/repositories/project-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository';
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository';
import { PrismaAttachmentRepository } from './prisma/repositories/prisma-attachment-repository';
import { PrismaFeedbackRepository } from './prisma/repositories/prisma-feedback-repository';
import { PrismaMemberRepository } from './prisma/repositories/prisma-member-repository';
import { PrismaProjectAttachmentRepository } from './prisma/repositories/prisma-project-attachment-repository';
import { PrismaProjectRepository } from './prisma/repositories/prisma-project-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AdminRepository,
      useClass: PrismaAdminRepository,
    },
    {
      provide: MemberRepository,
      useClass: PrismaMemberRepository,
    },
    {
      provide: ProjectRepository,
      useClass: PrismaProjectRepository,
    },
    {
      provide: FeedbackRepository,
      useClass: PrismaFeedbackRepository,
    },
    {
      provide: AnswerRepository,
      useClass: PrismaAnswerRepository,
    },
    {
      provide: AttachmentRepository,
      useClass: PrismaAttachmentRepository,
    },
    {
      provide: ProjectAttachmentRepository,
      useClass: PrismaProjectAttachmentRepository,
    },
  ],
  exports: [
    AdminRepository,
    MemberRepository,
    ProjectRepository,
    FeedbackRepository,
    AnswerRepository,
    AttachmentRepository,
    ProjectAttachmentRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}
