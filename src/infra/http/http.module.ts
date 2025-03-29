import { AuthenticateAdminUseCase } from '@/domain/feedback/application/use-cases/authenticate-admin';
import { AuthenticateMemberUseCase } from '@/domain/feedback/application/use-cases/authenticate-member';
import { CreateAdminUseCase } from '@/domain/feedback/application/use-cases/create-admin';
import { CreateFeedbackUseCase } from '@/domain/feedback/application/use-cases/create-feedback';
import { CreateFeedbackAnswerUseCase } from '@/domain/feedback/application/use-cases/create-feedback-answer';
import { CreateMemberUseCase } from '@/domain/feedback/application/use-cases/create-member';
import { CreateProjectUseCase } from '@/domain/feedback/application/use-cases/create-project';
import { FetchRecentProjectsUseCase } from '@/domain/feedback/application/use-cases/fetch-recent-projects';
import { GetProjectDetailsUseCase } from '@/domain/feedback/application/use-cases/get-project-details';
import { Module } from '@nestjs/common';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateAdminAccountController } from './controllers/authenticate-admin-account.controller';
import { AuthenticateMemberAccountController } from './controllers/authenticate-member-account.controller';
import { CreateAdminAccountController } from './controllers/create-admin-account.controller';
import { CreateFeedbackAnswerController } from './controllers/create-feedback-answer.controller';
import { CreateFeedbackController } from './controllers/create-feedback.controller';
import { CreateMemberAccountController } from './controllers/create-member-account.controller';
import { CreateProjectController } from './controllers/create-project.controller';
import { FetchRecentProjectsController } from './controllers/fetch-recent-projects.controller';
import { GetProjectDetailsController } from './controllers/get-project-details.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateMemberAccountController,
    CreateAdminAccountController,
    AuthenticateAdminAccountController,
    AuthenticateMemberAccountController,
    CreateProjectController,
    CreateFeedbackController,
    CreateFeedbackAnswerController,
    FetchRecentProjectsController,
    GetProjectDetailsController,
  ],
  providers: [
    CreateMemberUseCase,
    CreateAdminUseCase,
    AuthenticateAdminUseCase,
    AuthenticateMemberUseCase,
    CreateProjectUseCase,
    CreateFeedbackUseCase,
    CreateFeedbackAnswerUseCase,
    FetchRecentProjectsUseCase,
    GetProjectDetailsUseCase,
  ],
})
export class HttpModule {}
