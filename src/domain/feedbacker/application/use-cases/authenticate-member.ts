import { Either, left, right } from '@/core/either';
import { WrongCredentialsError } from '@/core/error/errors/wrong-credentials-error';
import { Injectable } from '@nestjs/common';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';
import { MemberRepository } from '../repositories/member-repository';

interface AuthenticateMemberUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateMemberUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateMemberUseCase {
  constructor(
    private memberRepository: MemberRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateMemberUseCaseRequest): Promise<AuthenticateMemberUseCaseResponse> {
    const member = await this.memberRepository.findByEmail(email);

    if (!member) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      member.password
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: member.id.toString(),
    });

    return right({
      accessToken,
    });
  }
}
