import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';
import { MemberRepository } from '../repositories/member-repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface AuthenticateMemberUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateMemberUseCaseResponse {
  accessToken: string;
}

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
      throw new WrongCredentialsError();
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      member.password
    );

    if (!isPasswordValid) {
      throw new WrongCredentialsError();
    }

    const accessToken = await this.encrypter.encrypt({
      sub: member.id.toString(),
    });

    return {
      accessToken,
    };
  }
}
