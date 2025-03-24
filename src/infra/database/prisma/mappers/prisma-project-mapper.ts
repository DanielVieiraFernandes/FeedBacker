import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Project } from '@/domain/feedback/enterprise/project';
import {
  Prisma,
  Attachment as PrismaAttachment,
  Project as PrismaProject,
} from '@prisma/client';

type PrismaProjectDetails = PrismaProject & {
  attachments: PrismaAttachment[];
};

export class PrismaProjectMapper {
  static toDomain(project: PrismaProject): Project {
    return Project.create({
      authorId: new UniqueEntityID(project.authorId),
      description: project.description,
      attachments: [],
      repositoryLink: project.repositoryLink,
      title: project.title,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    });
  }

  static toPrisma(project: Project): Prisma.ProjectUncheckedCreateInput {
    return {
      id: project.id.toString(),
      authorId: project.authorId.toString(),
      description: project.description,
      repositoryLink: project.repositoryLink,
      title: project.title,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
