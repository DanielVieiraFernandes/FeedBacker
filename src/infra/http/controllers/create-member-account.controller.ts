import { MemberAlreadyExistsError } from '@/core/error/errors/member-already-exists';
import { CreateMemberUseCase } from '@/domain/feedbacker/application/use-cases/create-member';
import { Public } from '@/infra/auth/public';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createAccountBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
@Public()
export class CreateMemberAccountController {
  constructor(private createMemberUseCase: CreateMemberUseCase) {}

  @Post('/member')
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createAccountBodySchema))
    body: CreateAccountBodySchema
  ) {
    const { name, email, password } = body;

    const result = await this.createMemberUseCase.execute({
      email,
      name,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case MemberAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
