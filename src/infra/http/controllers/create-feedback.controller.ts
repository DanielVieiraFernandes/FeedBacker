import { CreateFeedbackUseCase } from '@/domain/feedback/application/use-cases/create-feedback';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createFeedbackBodySchema = z.object({
  title: z.string(),
  grade: z.coerce.number().int().min(1).max(5),
  comment: z.string(),
});

type CreateFeedbackBodySchema = z.infer<typeof createFeedbackBodySchema>;

@Controller('/projects/:projectId/feedbacks')
export class CreateFeedbackController {
  constructor(private createFeedbackUseCase: CreateFeedbackUseCase) {}

  @Post()
  async handle(
    @Param('projectId') projectId: string,
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(createFeedbackBodySchema))
    body: CreateFeedbackBodySchema
  ) {
    const { comment, grade, title } = body;
    const { sub: authorId } = user;

    await this.createFeedbackUseCase.execute({
      authorId,
      comment,
      grade,
      projectId,
      title,
    });
  }
}
