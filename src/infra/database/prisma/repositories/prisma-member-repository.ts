import { MemberRepository } from '@/domain/feedback/application/repositories/member-repository';
import { Member } from '@/domain/feedback/enterprise/member';
import { PrismaMemberMapper } from '../mappers/prisma-member-mapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

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

  save(member: Member): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(member: Member): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Member | null> {
    throw new Error('Method not implemented.');
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
