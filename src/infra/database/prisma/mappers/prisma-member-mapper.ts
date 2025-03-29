import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Member } from '@/domain/feedback/enterprise/entities/member';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaMemberMapper {
  static toDomain(member: PrismaUser): Member {
    return Member.create(
      {
        name: member.name,
        email: member.email,
        password: member.password,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt,
      },
      new UniqueEntityID(member.id)
    );
  }

  static toPrisma(member: Member): Prisma.UserUncheckedCreateInput {
    return {
      id: member.id.toString(),
      name: member.name,
      email: member.email,
      password: member.password,
    };
  }
}
