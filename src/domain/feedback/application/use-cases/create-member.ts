import { Member } from '../../enterprise/member';
import { MemberRepository } from '../repositories/member-repository';

interface CreateMemberUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateMemberUseCaseResponse {}

export class CreateMemberUseCase {
  constructor(private memberRepository: MemberRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateMemberUseCaseRequest): Promise<CreateMemberUseCaseResponse> {
    const data = Member.create({
      name,
      email,
      password,
    });

    await this.memberRepository.create(data);

    return {};
  }
}
