import { ProjectAttachmentRepository } from '@/domain/feedback/application/repositories/project-attachment-repository';
import { ProjectAttachment } from '@/domain/feedback/enterprise/entities/project-attachment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProjectAttachmentRepository
  implements ProjectAttachmentRepository
{
  constructor(private prisma: PrismaService) {}

  createMany(projectAttachments: ProjectAttachment[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByProjectId(projectId: string): Promise<ProjectAttachment[]> {
    throw new Error('Method not implemented.');
  }
  deleteManyByProjectId(projectId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
