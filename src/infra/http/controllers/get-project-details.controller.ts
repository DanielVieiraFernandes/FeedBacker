import { ProjectDoesNotExistError } from '@/domain/feedbacker/application/use-cases/errors/project-does-not-exist';
import { GetProjectDetailsUseCase } from '@/domain/feedbacker/application/use-cases/get-project-details';
import { Public } from '@/infra/auth/public';
import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { ProjectDetailsPresenter } from '../presenters/project-details-presenter';

@Controller('/projects/:projectId')
@Public()
export class GetProjectDetailsController {
  constructor(private getProjectDetailsUseCase: GetProjectDetailsUseCase) {}

  @Get()
  async handle(@Param('projectId') projectId: string) {
    const result = await this.getProjectDetailsUseCase.execute({
      projectId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ProjectDoesNotExistError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { project } = result.value;

    return {
      project: ProjectDetailsPresenter.toHttp(project),
    };
  }
}
