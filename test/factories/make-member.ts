import {
  Member,
  MemberProps,
} from '@/domain/feedbacker/enterprise/entities/member';
import { faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
export function makeMember(
  override: Partial<MemberProps> = {},
  id?: UniqueEntityID
) {
  const member = Member.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      ...override,
    },
    id
  );

  return member;
}
