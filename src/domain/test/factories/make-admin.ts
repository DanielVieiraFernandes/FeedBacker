import { faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Admin, AdminProps } from 'src/domain/feedback/enterprise/admin';
export function makeAdmin(
  override: Partial<AdminProps> = {},
  id?: UniqueEntityID
) {
  const admin = Admin.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      ...override,
    },
    id
  );

  return admin;
}
