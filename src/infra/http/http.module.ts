import { CreateMemberUseCase } from '@/domain/feedback/application/use-cases/create-member';
import { Module } from '@nestjs/common';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { CreateMemberAccountController } from './controllers/create-member-account.controller';
import { CreateAdminAccountController } from './controllers/create-admin-account.controller';
import { CreateAdminUseCase } from '@/domain/feedback/application/use-cases/create-admin';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateMemberAccountController, CreateAdminAccountController],
  providers: [CreateMemberUseCase, CreateAdminUseCase],
})
export class HttpModule {}
