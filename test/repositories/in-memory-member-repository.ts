import { MemberRepository } from 'src/domain/feedback/application/repositories/member-repository';
import { Member } from 'src/domain/feedback/enterprise/member';

export class InMemoryMemberRepository implements MemberRepository {
  public items: Member[] = [];

  async create(member: Member) {
    this.items.push(member);
  }
  async findByEmail(email: string): Promise<Member | null> {
    const member = this.items.find(item => item.props.email === email);

    if (!member) {
      return null;
    }

    return member;
  }

  async findById(id: string): Promise<Member | null> {
    const member = this.items.find(item => item.id.toString() === id);

    if (!member) {
      return null;
    }

    return member;
  }

  save(member: Member): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(member: Member): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
