import { Admin } from '@/domain/feedback/enterprise/admin';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaAdminMapper {
  static toDomain(admin: PrismaUser): Admin {
    return Admin.create({
      name: admin.name,
      email: admin.email,
      password: admin.password,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    });
  }

  static toPrisma(admin: Admin): Prisma.UserUncheckedCreateInput {
    return {
      id: admin.id.toString(),
      name: admin.name,
      email: admin.email,
      password: admin.password,
    };
  }
}
