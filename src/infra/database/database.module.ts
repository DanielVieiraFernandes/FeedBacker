import { AdminRepository } from '@/domain/feedback/application/repositories/admin-repository';
import { MemberRepository } from '@/domain/feedback/application/repositories/member-repository';
import { Module } from '@nestjs/common';
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository';
import { PrismaMemberRepository } from './prisma/repositories/prisma-member-repository';

@Module({
  providers: [
    {
      provide: AdminRepository,
      useClass: PrismaAdminRepository,
    },
    {
      provide: MemberRepository,
      useClass: PrismaMemberRepository,
    },
  ],
  exports: [AdminRepository, MemberRepository],
})
export class DatabaseModule {}
