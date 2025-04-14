import {
  Member,
  MemberProps,
} from '@/domain/feedbacker/enterprise/entities/member';
import { PrismaMemberMapper } from '@/infra/database/prisma/mappers/prisma-member-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class MemberFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaMember(data: Partial<MemberProps> = {}): Promise<Member> {
    const member = makeMember(data);

    await this.prisma.user.create({
      data: PrismaMemberMapper.toPrisma(member),
    });

    return member;
  }
}
