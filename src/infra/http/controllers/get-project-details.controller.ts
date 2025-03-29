import { ProjectDoesNotExistError } from '@/domain/feedback/application/use-cases/errors/project-does-not-exist';
import { GetProjectDetailsUseCase } from '@/domain/feedback/application/use-cases/get-project-details';
import { Public } from '@/infra/auth/public';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ProjectsPresenter } from '../presenters/projects-presenter';

@Controller('/projects/:projectId')
@Public()
export class GetProjectDetailsController {
  constructor(private getProjectDetailsUseCase: GetProjectDetailsUseCase) {}

  @Get()
  async handle(@Param('projectId') projectId: string) {
    try {
      const { project } = await this.getProjectDetailsUseCase.execute({
        projectId,
      });

      return {
        project: ProjectsPresenter.toHttp(project),
      };
    } catch (error) {
      if (error instanceof ProjectDoesNotExistError) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
