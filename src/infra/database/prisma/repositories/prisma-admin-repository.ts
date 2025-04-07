import { AdminRepository } from '@/domain/feedbacker/application/repositories/admin-repository';
import { Admin } from '@/domain/feedbacker/enterprise/entities/admin';
import { Injectable } from '@nestjs/common';
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(private prisma: PrismaService) {}

  async create(admin: Admin): Promise<void> {
    const data = PrismaAdminMapper.toPrisma(admin);

    await this.prisma.user.create({
      data: {
        ...data,
        role: 'ADMIN',
      },
    });
  }
  async save(admin: Admin): Promise<void> {
    const data = PrismaAdminMapper.toPrisma(admin);

    await this.prisma.user.update({
      where: {
        id: data.id,
        role: 'ADMIN',
      },
      data,
    });
  }

  async delete(admin: Admin): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: admin.id.toString(),
        role: 'ADMIN',
      },
    });
  }

  async findById(id: string): Promise<Admin | null> {
    const data = await this.prisma.user.findUnique({
      where: {
        id,
        role: 'ADMIN',
      },
    });

    if (!data) {
      return null;
    }

    return PrismaAdminMapper.toDomain(data);
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return null;
    }

    return PrismaAdminMapper.toDomain(admin);
  }
}
