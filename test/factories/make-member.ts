import { faker } from "@faker-js/faker";
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Member, MemberProps } from 'src/domain/feedback/enterprise/member';
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
