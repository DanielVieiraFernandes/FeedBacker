import { MemberRepository } from '@/domain/feedback/application/repositories/member-repository';
import { Member } from '@/domain/feedback/enterprise/member';
import { Injectable } from '@nestjs/common';
import { PrismaMemberMapper } from '../mappers/prisma-member-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMemberRepository implements MemberRepository {
  constructor(private prisma: PrismaService) {}

  async create(member: Member): Promise<void> {
    const data = PrismaMemberMapper.toPrisma(member);

    await this.prisma.user.create({
      data: {
        ...data,
        role: 'MEMBER',
      },
    });
  }

  async save(member: Member): Promise<void> {
    const data = PrismaMemberMapper.toPrisma(member);

    await this.prisma.user.update({
      where: {
        id: data.id,
        role: 'MEMBER',
      },
      data,
    });
  }

  async delete(member: Member): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: member.id.toString(),
        role: 'ADMIN',
      },
    });
  }

  async findById(id: string): Promise<Member | null> {
    const data = await this.prisma.user.findUnique({
      where: {
        id,
        role: 'MEMBER',
      },
    });

    if (!data) {
      return null;
    }

    return PrismaMemberMapper.toDomain(data);
  }

  async findByEmail(email: string): Promise<Member | null> {
    const member = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!member) {
      return null;
    }

    return PrismaMemberMapper.toDomain(member);
  }
}
