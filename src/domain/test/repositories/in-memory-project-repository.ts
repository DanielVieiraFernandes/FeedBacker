import { ProjectAttachmentRepository } from '@/domain/feedback/application/repositories/project-attachment-repository';
import { Project } from '@/domain/feedback/enterprise/project';
import { ProjectRepository } from 'src/domain/feedback/application/repositories/project-repository';

export class InMemoryProjectRepository implements ProjectRepository {
  public items: Project[] = [];

  constructor(private projectAttachment: ProjectAttachmentRepository){}
  async create(project: Project) {
    this.items.push(project);

    await this.projectAttachment.createMany(project.attachments);
  }

  async save(project: Project): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === project.id);

    this.items[itemIndex] = project;
  }

  async findById(id: string): Promise<Project | null> {
    throw new Error('Method not implemented.');
  }
}
