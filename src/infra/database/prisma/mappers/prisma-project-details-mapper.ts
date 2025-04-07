import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ProjectDetails } from '@/domain/feedbacker/enterprise/value-objects/project-details';
import {
  Attachment as PrismaAttachment,
  Project as PrismaProject,
  User as PrismaUser,
} from '@prisma/client';
import { PrismaAttachmentMapper } from './prisma-attachment-mapper';

type PrismaProjectDetails = PrismaProject & {
  author: PrismaUser;
  attachments: PrismaAttachment[];
};

export class PrismaProjectDetailsMapper {
  static toDomain(raw: PrismaProjectDetails): ProjectDetails {
    return ProjectDetails.create({
      projectId: new UniqueEntityID(raw.id),
      authorId: new UniqueEntityID(raw.authorId),
      author: raw.author.name,
      title: raw.title,
      description: raw.description,
      repositoryLink: raw.repositoryLink,
      attachments: raw.attachments.map(PrismaAttachmentMapper.toDomain),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
