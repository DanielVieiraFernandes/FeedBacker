import { Member } from '../../enterprise/member';

export abstract class MemberRepository {
  abstract create(member: Member): Promise<void>;
  abstract save(member: Member): Promise<void>;
  abstract delete(member: Member): Promise<void>;
  abstract findById(id: string): Promise<Member | null>;
  abstract findByEmail(Email: string): Promise<Member | null>;
}
