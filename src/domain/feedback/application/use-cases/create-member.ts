import { Member } from '../../enterprise/member';
import { HashGenerator } from '../cryptography/hash-generator';
import { MemberRepository } from '../repositories/member-repository';
import { MemberAlreadyExistsError } from './errors/member-already-exists';

interface CreateMemberUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateMemberUseCaseResponse {}

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
      throw new MemberAlreadyExistsError(email);
    }

    const passwordHashed = await this.hashGenerator.hash(password);

    const data = Member.create({
      name,
      email,
      password: passwordHashed,
      feedbacks: [],
      projects: [],
    });

    await this.memberRepository.create(data);

    return {};
  }
}
