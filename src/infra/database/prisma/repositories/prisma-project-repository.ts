import { DomainEvents } from '@/core/events/domain-events';
import { AttachmentRepository } from '@/domain/feedbacker/application/repositories/attachment-repository';
import { findByIdProps } from '@/domain/feedbacker/application/repositories/interfaces/find-by-d-interface';
import { ProjectAttachmentsRepository } from '@/domain/feedbacker/application/repositories/project-attachment-repository';
import { ProjectRepository } from '@/domain/feedbacker/application/repositories/project-repository';
import { Project } from '@/domain/feedbacker/enterprise/entities/project';
import { ProjectDetails } from '@/domain/feedbacker/enterprise/value-objects/project-details';
import { Injectable } from '@nestjs/common';
import { PrismaProjectDetailsMapper } from '../mappers/prisma-project-details-mapper';
import { PrismaProjectMapper } from '../mappers/prisma-project-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(
    private prisma: PrismaService,
    private projectAttachmentsRepository: ProjectAttachmentsRepository
  ) {}

  async findMany(page: number): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        attachments: true,
        author: true,
      },
      take: 25,
      skip: (page - 1) * 25,
    });

    return projects.map(PrismaProjectMapper.toDomain);
  }

  async create(project: Project): Promise<void> {
    const data = PrismaProjectMapper.toPrisma(project);

    await this.prisma.project.create({
      data,
    });

    await this.projectAttachmentsRepository.createMany(
      project.attachments.getItems()
    );

    // DomainEvents.dispatchEventsForAggregate(project.id);
  }

  async save(project: Project): Promise<void> {
    const data = PrismaProjectMapper.toPrisma(project);

    await Promise.all([
      this.prisma.project.update({
        where: {
          id: data.id,
          authorId: data.authorId,
        },
        data,
      }),

      this.projectAttachmentsRepository.createMany(
        project.attachments.getNewItems()
      ),

      this.projectAttachmentsRepository.deleteManyByProjectId(
        project.attachments.getRemovedItems()
      ),
    ]);
  }

  async findDetailsById({ id }: findByIdProps): Promise<ProjectDetails | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        attachments: true,
        author: true,
      },
    });

    if (!project) {
      return null;
    }

    return PrismaProjectDetailsMapper.toDomain(project);
  }

  async findById({ id }: findByIdProps): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        attachments: true,
        author: true,
      },
    });

    if (!project) {
      return null;
    }

    return PrismaProjectMapper.toDomain(project);
  }

  async delete(project: Project): Promise<void> {
    await this.prisma.project.delete({
      where: {
        id: project.id.toString(),
      },
    });
  }
}
