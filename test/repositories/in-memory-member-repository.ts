import { MemberRepository } from 'src/domain/feedback/application/repositories/member-repository';
import { Member } from 'src/domain/feedback/enterprise/member';

export class InMemoryMemberRepository implements MemberRepository {
  public items: Member[] = [];

  async create(member: Member) {
    this.items.push(member);
  }
  save(member: Member): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(member: Member): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Member | null> {
    throw new Error('Method not implemented.');
  }
}
