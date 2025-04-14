import { ProjectDoesNotExistError } from '@/core/error/errors/project-does-not-exist';
import { UserNotAllowedError } from '@/core/error/errors/user-not-allowed';
import { EditProjectUseCase } from '@/domain/feedbacker/application/use-cases/edit-project';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const editProjectBodySchema = z.object({
  title: z.string().min(4).max(70).nullable().default(null),
  description: z.string().nullable().default(null),
  repositoryLink: z.string().url().nullable().default(null),
  attachmentsIds: z.array(z.string()).nullable().default(null),
});

type EditProjectBodySchema = z.infer<typeof editProjectBodySchema>;

@Controller('/projects/:projectId')
export class EditProjectController {
  constructor(private editProject: EditProjectUseCase) {}

  @Put()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('projectId') projectId: string,
    @Body(new ZodValidationPipe(editProjectBodySchema))
    body: EditProjectBodySchema
  ) {
    const { sub: authorId } = user;
    const { title, repositoryLink, description, attachmentsIds } = body;

    const result = await this.editProject.execute({
      authorId,
      projectId,
      title,
      description,
      repositoryLink,
      attachmentsIds,
    });

    if (result.isLeft()) {
        console.log('passou aqui')
      const error = result.value;

      console.log(error.message, 'mensagme')

      switch (error.constructor) {
        case ProjectDoesNotExistError:
          throw new ConflictException(error.message);
        case UserNotAllowedError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
