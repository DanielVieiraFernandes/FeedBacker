import { AdminRepository } from '@/domain/feedback/application/repositories/admin-repository';
import { MemberRepository } from '@/domain/feedback/application/repositories/member-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository';
import { PrismaMemberRepository } from './prisma/repositories/prisma-member-repository';

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
  ],
  exports: [AdminRepository, MemberRepository, PrismaService],
})
export class DatabaseModule {}
