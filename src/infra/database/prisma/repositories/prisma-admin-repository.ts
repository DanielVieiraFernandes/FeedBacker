import { AdminRepository } from '@/domain/feedback/application/repositories/admin-repository';
import { Admin } from '@/domain/feedback/enterprise/admin';
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper';
import { PrismaService } from '../prisma.service';

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
  save(admin: Admin): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(admin: Admin): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Admin | null> {
    throw new Error('Method not implemented.');
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
