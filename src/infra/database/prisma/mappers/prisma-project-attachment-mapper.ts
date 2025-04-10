import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ProjectAttachment } from '@/domain/feedbacker/enterprise/entities/project-attachment';
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client';

export class PrismaProjectAttachmentMapper {
  static toDomain(raw: PrismaAttachment): ProjectAttachment {
    if (!raw.projectId) {
      throw new Error('Invalid attachment type.');
    }

    return ProjectAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        projectId: new UniqueEntityID(raw.projectId),
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrismaUpdateMany(
    attachments: ProjectAttachment[]
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentsIds = attachments.map(attachment => {
      return attachment.attachmentId.toString();
    });

    return {
      where: {
        id: {
          in: attachmentsIds,
        },
      },
      data: {
        projectId: attachments[0].projectId.toString(),
      },
    };
  }
}
