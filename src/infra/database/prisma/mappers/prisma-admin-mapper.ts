import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Admin } from '@/domain/feedback/enterprise/entities/admin';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaAdminMapper {
  static toDomain(admin: PrismaUser): Admin {
    return Admin.create(
      {
        name: admin.name,
        email: admin.email,
        password: admin.password,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      },
      new UniqueEntityID(admin.id)
    );
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
