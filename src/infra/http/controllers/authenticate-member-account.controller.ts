import { WrongCredentialsError } from '@/core/error/errors/wrong-credentials-error';
import { AuthenticateMemberUseCase } from '@/domain/feedbacker/application/use-cases/authenticate-member';
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
    const { email, password } = body;

    const result = await this.authenticateMemberUseCase.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return { access_token: accessToken };
  }
}
