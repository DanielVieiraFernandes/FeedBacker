import { CreateProjectUseCase } from '@/domain/feedbacker/application/use-cases/create-project';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createProjectBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  repositoryLink: z.string(),
  attachmentsIds: z.array(z.string()),
});

type CreateProjectBodySchema = z.infer<typeof createProjectBodySchema>;

@Controller('/projects')
export class CreateProjectController {
  constructor(private createProjectUseCase: CreateProjectUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(createProjectBodySchema))
    body: CreateProjectBodySchema
  ) {
    const { sub: userId } = user;
    console.log(userId);

    const { attachmentsIds, description, repositoryLink, title } = body;

    const result = await this.createProjectUseCase.execute({
      attachmentsIds,
      authorId: userId,
      description,
      repositoryLink,
      title,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
