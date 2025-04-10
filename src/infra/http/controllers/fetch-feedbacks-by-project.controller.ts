import { FetchFeedbacksByProjectUseCase } from '@/domain/feedbacker/application/use-cases/fetch-feedbacks-by-project';
import { Public } from '@/infra/auth/public';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { FeedbacksPresenter } from '../presenters/feedbacks-presenter';

const pageQueryValidationSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

type PageQueryValidationSchema = z.infer<typeof pageQueryValidationSchema>;

@Controller('/projects/:projectId/feedbacks')
@Public()
export class FetchFeedbacksByProjectController {
  constructor(
    private fetchFeedbacksByProject: FetchFeedbacksByProjectUseCase
  ) {}

  @Get()
  async handle(
    @Param('projectId') projectId: string,
    @Query('page', new ZodValidationPipe(pageQueryValidationSchema))
    page: PageQueryValidationSchema
  ) {
    const result = await this.fetchFeedbacksByProject.execute({
      page,
      projectId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { feedbacks } = result.value;

    return {
      feedbacks: feedbacks.map(FeedbacksPresenter.toHttp),
    };
  }
}
