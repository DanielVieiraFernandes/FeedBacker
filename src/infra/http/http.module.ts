import { AuthenticateAdminUseCase } from '@/domain/feedback/application/use-cases/authenticate-admin';
import { AuthenticateMemberUseCase } from '@/domain/feedback/application/use-cases/authenticate-member';
import { CreateAdminUseCase } from '@/domain/feedback/application/use-cases/create-admin';
import { CreateMemberUseCase } from '@/domain/feedback/application/use-cases/create-member';
import { CreateProjectUseCase } from '@/domain/feedback/application/use-cases/create-project';
import { Module } from '@nestjs/common';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateAdminAccountController } from './controllers/authenticate-admin-account.controller';
import { AuthenticateMemberAccountController } from './controllers/authenticate-member-account.controller';
import { CreateAdminAccountController } from './controllers/create-admin-account.controller';
import { CreateMemberAccountController } from './controllers/create-member-account.controller';
import { CreateProjectController } from './controllers/create-project.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateMemberAccountController,
    CreateAdminAccountController,
    AuthenticateAdminAccountController,
    AuthenticateMemberAccountController,
    CreateProjectController,
  ],
  providers: [
    CreateMemberUseCase,
    CreateAdminUseCase,
    AuthenticateAdminUseCase,
    AuthenticateMemberUseCase,
    CreateProjectUseCase,
  ],
})
export class HttpModule {}
