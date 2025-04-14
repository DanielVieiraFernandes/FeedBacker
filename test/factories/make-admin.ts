import {
  Admin,
  AdminProps,
} from '@/domain/feedbacker/enterprise/entities/admin';
import { PrismaAdminMapper } from '@/infra/database/prisma/mappers/prisma-admin-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
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

@Injectable()
export class AdminFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAdmin(data: Partial<AdminProps> = {}): Promise<Admin> {
    const member = makeAdmin(data);

    await this.prisma.user.create({
      data: PrismaAdminMapper.toPrisma(member),
    });

    return member;
  }
}
