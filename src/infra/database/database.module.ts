import { AdminRepository } from '@/domain/feedback/application/repositories/admin-repository';
import { AnswerRepository } from '@/domain/feedback/application/repositories/answer-repository';
import { FeedbackRepository } from '@/domain/feedback/application/repositories/feedback-repository';
import { MemberRepository } from '@/domain/feedback/application/repositories/member-repository';
import { ProjectRepository } from '@/domain/feedback/application/repositories/project-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository';
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository';
import { PrismaFeedbackRepository } from './prisma/repositories/prisma-feedback-repository';
import { PrismaMemberRepository } from './prisma/repositories/prisma-member-repository';
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
  ],
  exports: [
    AdminRepository,
    MemberRepository,
    ProjectRepository,
    FeedbackRepository,
    AnswerRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}
