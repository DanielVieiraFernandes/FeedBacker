import { CreateFeedbackAnswerUseCase } from '@/domain/feedbacker/application/use-cases/create-feedback-answer';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createFeedbackAnswerBodySchema = z.object({
  content: z.string().refine(
    value => {
      const words = value.trim().split('/s+/');
      return words.length <= 200;
    },
    {
      message: 'A resposta deve conter no máximo 200 palavras',
    }
  ),
});

type CreateFeedbackAnswerBodySchema = z.infer<
  typeof createFeedbackAnswerBodySchema
>;

@Controller('/feedbacks/:feedbackId/answers')
export class CreateFeedbackAnswerController {
  constructor(private createAnswerUseCase: CreateFeedbackAnswerUseCase) {}

  @Post()
  async handle(
    @Param('feedbackId') feedbackId: string,
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(createFeedbackAnswerBodySchema))
    body: CreateFeedbackAnswerBodySchema
  ) {
    const { content } = body;
    const { sub: authorId } = user;

    const result = await this.createAnswerUseCase.execute({
      authorId,
      feedbackId,
      content,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
