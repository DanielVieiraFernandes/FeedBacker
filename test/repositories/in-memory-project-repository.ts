import { findByIdProps } from '@/domain/feedback/application/repositories/interfaces/find-by-d-interface';
import { ProjectAttachmentRepository } from '@/domain/feedback/application/repositories/project-attachment-repository';
import { Project } from '@/domain/feedback/enterprise/project';
import { ProjectRepository } from 'src/domain/feedback/application/repositories/project-repository';

export class InMemoryProjectRepository implements ProjectRepository {
  public items: Project[] = [];

  constructor(private projectAttachment: ProjectAttachmentRepository) {}
  async create(project: Project) {
    this.items.push(project);

    await this.projectAttachment.createMany(project.attachments);
  }

  async save(project: Project): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === project.id);

    this.items[itemIndex] = project;
  }

  async findById({ id, authorId }: findByIdProps): Promise<Project | null> {
    const project = this.items.find(
      item => item.id.toString() === id && item.authorId.toString() === authorId
    );

    if (!project) {
      return null;
    }

    return project;
  }

  async delete(id: string): Promise<void> {
    const project = this.items.findIndex(item => item.id.toString() === id);

    if (project >= 0) {
      this.items.splice(project, 1);
    }
  }
}
