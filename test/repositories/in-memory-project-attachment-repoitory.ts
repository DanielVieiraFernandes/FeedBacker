import { ProjectAttachmentsRepository } from '@/domain/feedbacker/application/repositories/project-attachment-repository';
import { ProjectAttachment } from '@/domain/feedbacker/enterprise/entities/project-attachment';

export class InMemoryProjectAttachmentsRepository
  implements ProjectAttachmentsRepository
{
  public items: ProjectAttachment[] = [];

  async createMany(projectAttachments: ProjectAttachment[]): Promise<void> {
    for (let attachment of projectAttachments) {
      this.items.push(attachment);
    }
  }

  async findManyByProjectId(projectId: string): Promise<ProjectAttachment[]> {
    const projectAttachments = this.items.filter(
      item => item.id.toString() === projectId
    );

    return projectAttachments;
  }
  async deleteManyByProjectId(
    projectAttachments: ProjectAttachment[]
  ): Promise<void> {

    console.log(projectAttachments[0].projectId);

    const newProjectAttachments = this.items.filter(
      item => item.projectId !== projectAttachments[0].projectId
    );

    this.items = newProjectAttachments;
  }
}
