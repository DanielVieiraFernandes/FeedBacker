import { CreateAdminUseCase } from '@/domain/feedback/application/use-cases/create-admin';
import { AdminAlreadyExistsError } from '@/domain/feedback/application/use-cases/errors/admin-already-exists';
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
import { Public } from '@/infra/auth/public';

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
    try {
      const { name, email, password } = body;

      await this.createAdminUseCase.execute({
        email,
        name,
        password,
      });
    } catch (error) {
      if (error instanceof AdminAlreadyExistsError) {
        throw new ConflictException(error.message);
      }

      throw new BadRequestException(error.message);
    }
  }
}
