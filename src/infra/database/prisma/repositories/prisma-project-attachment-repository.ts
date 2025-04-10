import { ProjectAttachmentsRepository } from '@/domain/feedbacker/application/repositories/project-attachment-repository';
import { ProjectAttachment } from '@/domain/feedbacker/enterprise/entities/project-attachment';
import { Injectable } from '@nestjs/common';
import { PrismaProjectAttachmentMapper } from '../mappers/prisma-project-attachment-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProjectAttachmentRepository
  implements ProjectAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findManyByProjectId(projectId: string): Promise<ProjectAttachment[]> {
    throw new Error('Method not implemented.');
  }

  async createMany(projectAttachments: ProjectAttachment[]): Promise<void> {
    if (projectAttachments.length === 0) {
      return;
    }

    const data =
      PrismaProjectAttachmentMapper.toPrismaUpdateMany(projectAttachments);

    await this.prisma.attachment.updateMany(data);
  }
  findByProjectId(projectId: string): Promise<ProjectAttachment[]> {
    throw new Error('Method not implemented.');
  }
  async deleteManyByProjectId(
    projectAttachments: ProjectAttachment[]
  ): Promise<void> {
    if (projectAttachments.length === 0) {
      return;
    }

    const attachmentsIds = projectAttachments.map(attachment => {
      return attachment.id.toValue();
    });

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentsIds,
        },
      },
    });
  }
}
