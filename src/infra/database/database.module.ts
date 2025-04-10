import { AdminRepository } from '@/domain/feedbacker/application/repositories/admin-repository';
import { AnswerRepository } from '@/domain/feedbacker/application/repositories/answer-repository';
import { AttachmentRepository } from '@/domain/feedbacker/application/repositories/attachment-repository';
import { FeedbackRepository } from '@/domain/feedbacker/application/repositories/feedback-repository';
import { MemberRepository } from '@/domain/feedbacker/application/repositories/member-repository';
import { ProjectAttachmentsRepository } from '@/domain/feedbacker/application/repositories/project-attachment-repository';
import { ProjectRepository } from '@/domain/feedbacker/application/repositories/project-repository';
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
      provide: ProjectAttachmentsRepository,
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
    ProjectAttachmentsRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}
