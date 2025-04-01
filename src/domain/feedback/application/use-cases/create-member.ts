import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Member } from '../../enterprise/entities/member';
import { HashGenerator } from '../cryptography/hash-generator';
import { MemberRepository } from '../repositories/member-repository';
import { MemberAlreadyExistsError } from './errors/member-already-exists';

interface CreateMemberUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type CreateMemberUseCaseResponse = Either<MemberAlreadyExistsError, {}>;

@Injectable()
export class CreateMemberUseCase {
  constructor(
    private memberRepository: MemberRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateMemberUseCaseRequest): Promise<CreateMemberUseCaseResponse> {
    const member = await this.memberRepository.findByEmail(email);

    if (member) {
      return left(new MemberAlreadyExistsError(email));
    }

    const passwordHashed = await this.hashGenerator.hash(password);

    const data = Member.create({
      name,
      email,
      password: passwordHashed,
    });

    await this.memberRepository.create(data);

    return right({});
  }
}
