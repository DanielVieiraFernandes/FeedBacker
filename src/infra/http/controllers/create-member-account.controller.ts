import { CreateMemberUseCase } from '@/domain/feedback/application/use-cases/create-member';
import { MemberAlreadyExistsError } from '@/domain/feedback/application/use-cases/errors/member-already-exists';
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
import {Public} from "@/infra/auth/public";
const createAccountBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class CreateMemberAccountController {
  constructor(private createMemberUseCase: CreateMemberUseCase) {}

  @Post('/member')
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createAccountBodySchema))
    body: CreateAccountBodySchema
  ) {
    try {
      const { name, email, password } = body;

      await this.createMemberUseCase.execute({
        email,
        name,
        password,
      });
    } catch (error) {
      if (error instanceof MemberAlreadyExistsError) {
        throw new ConflictException(error.message);
      }

      throw new BadRequestException(error.message);
    }
  }
}
