import { FetchRecentProjectsUseCase } from '@/domain/feedbacker/application/use-cases/fetch-recent-projects';
import { Public } from '@/infra/auth/public';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { ProjectsPresenter } from '../presenters/projects-presenter';

const pageQueryValidationSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

type PageQueryValidationSchema = z.infer<typeof pageQueryValidationSchema>;

const queryValidationPipe = new ZodValidationPipe(pageQueryValidationSchema);

@Controller('/projects')
@Public()
export class FetchRecentProjectsController {
  constructor(private fetchRecentProjectsUseCase: FetchRecentProjectsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryValidationSchema
  ) {
    const result = await this.fetchRecentProjectsUseCase.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { projects } = result.value;

    return {
      projects: projects.map(ProjectsPresenter.toHttp),
    };
  }
}
