import { findByIdProps } from '@/domain/feedback/application/repositories/interfaces/find-by-d-interface';
import { ProjectRepository } from '@/domain/feedback/application/repositories/project-repository';
import { Project } from '@/domain/feedback/enterprise/project';
import { Injectable } from '@nestjs/common';
import { PrismaProjectMapper } from '../mappers/prisma-project-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}
  findMany(page: number): Promise<Project[]> {
    throw new Error('Method not implemented.');
  }

  async create(project: Project): Promise<void> {
    const data = PrismaProjectMapper.toPrisma(project);

    await this.prisma.project.create({
      data,
    });
  }

  save(project: Project): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById({ authorId, id }: findByIdProps): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
        authorId,
      },
    });

    if (!project) {
      return null;
    }

    return PrismaProjectMapper.toDomain(project);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: {
        id,
      },
    });
  }
}
