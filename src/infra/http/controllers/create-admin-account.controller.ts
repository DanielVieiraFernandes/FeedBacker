import { AdminAlreadyExistsError } from '@/core/error/errors/admin-already-exists';
import { CreateAdminUseCase } from '@/domain/feedbacker/application/use-cases/create-admin';
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
export class CreateAdminAccountController {
  constructor(private createAdminUseCase: CreateAdminUseCase) {}

  @Post('/admin')
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createAccountBodySchema))
    body: CreateAccountBodySchema
  ) {
    const { name, email, password } = body;

    const result = await this.createAdminUseCase.execute({
      email,
      name,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case AdminAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
