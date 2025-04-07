import { ProjectAttachmentsRepository } from '@/domain/feedbacker/application/repositories/project-attachment-repository';
import { ProjectAttachment } from '@/domain/feedbacker/enterprise/entities/project-attachment';

export class InMemoryProjectAttachmentsRepository
  implements ProjectAttachmentsRepository
{
  public items: ProjectAttachment[] = [];

  async findManyByProjectId(projectId: string): Promise<ProjectAttachment[]> {
    const projectAttachments = this.items.filter(
      item => item.id.toString() === projectId
    );

    return projectAttachments;
  }
  async deleteManyByProjectId(projectId: string): Promise<void> {
    const projectAttachments = this.items.filter(
      item => item.projectId.toString() !== projectId
    );

    this.items = projectAttachments;
  }
}
