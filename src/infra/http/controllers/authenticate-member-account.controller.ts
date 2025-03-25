import { AuthenticateMemberUseCase } from '@/domain/feedback/application/use-cases/authenticate-member';
import { WrongCredentialsError } from '@/domain/feedback/application/use-cases/errors/wrong-credentials-error';
import { Public } from '@/infra/auth/public';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
@Public()
export class AuthenticateMemberAccountController {
  constructor(private authenticateMemberUseCase: AuthenticateMemberUseCase) {}

  @Post('/member')
  async handle(
    @Body(new ZodValidationPipe(authenticateBodySchema))
    body: AuthenticateBodySchema
  ) {
    try {
      const { email, password } = body;

      const { accessToken } = await this.authenticateMemberUseCase.execute({
        email,
        password,
      });

      return { accessToken };
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        throw new UnauthorizedException(error.message);
      }

      throw new BadRequestException(error.message);
    }
  }
}
