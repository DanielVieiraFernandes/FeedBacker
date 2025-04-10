import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Project } from '@/domain/feedbacker/enterprise/entities/project';
import { ProjectAttachment } from '@/domain/feedbacker/enterprise/entities/project-attachment';
import { ProjectAttachmentList } from '@/domain/feedbacker/enterprise/entities/project-attachment-list';
import {
  Prisma,
  Attachment as PrismaAttachment,
  Project as PrismaProject,
} from '@prisma/client';
type PrismaProjectWithAttachment = PrismaProject & {
  attachments: PrismaAttachment[];
};

export class PrismaProjectMapper {
  static toDomain(project: PrismaProjectWithAttachment): Project {
    return Project.create({
      authorId: new UniqueEntityID(project.authorId),
      description: project.description,
      attachments: new ProjectAttachmentList(
        project.attachments.map(attachment => {
          return ProjectAttachment.create({
            attachmentId: new UniqueEntityID(attachment.id),
            projectId: new UniqueEntityID(project.id),
          });
        })
      ),
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
