import { ProjectAttachmentRepository } from '@/domain/feedback/application/repositories/project-attachment-repository';
import { ProjectAttachment } from '@/domain/feedback/enterprise/project-attachment';

export class InMemoryProjectAttachmentRepository implements ProjectAttachmentRepository {
  public items: ProjectAttachment[] = [];
  async createMany(projectAttachments: ProjectAttachment[]): Promise<void> {
    this.items.push(...projectAttachments);
  }
  async findByProjectId(projectId: string): Promise<ProjectAttachment[]> {
    throw new Error('Method not implemented.');
  }
  async deleteManyByProjectId(projectId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
