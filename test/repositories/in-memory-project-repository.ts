import { findByIdProps } from '@/domain/feedbacker/application/repositories/interfaces/find-by-d-interface';
import { ProjectAttachmentsRepository } from '@/domain/feedbacker/application/repositories/project-attachment-repository';
import { ProjectRepository } from '@/domain/feedbacker/application/repositories/project-repository';
import { Attachment } from '@/domain/feedbacker/enterprise/entities/attachment';
import { Project } from '@/domain/feedbacker/enterprise/entities/project';
import { ProjectDetails } from '@/domain/feedbacker/enterprise/value-objects/project-details';

export class InMemoryProjectRepository implements ProjectRepository {
  public items: Project[] = [];

  constructor(private projectAttachment: ProjectAttachmentsRepository) {}

  async findDetailsById({ id }: findByIdProps): Promise<ProjectDetails | null> {
    const project = this.items.find(item => item.id.toString() === id);

    if (!project) {
      return null;
    }

    return ProjectDetails.create({
      projectId: project.id,
      attachments: [],
      author: '',
      authorId: project.authorId,
      createdAt: project.createdAt,
      description: project.description,
      repositoryLink: project.repositoryLink,
      title: project.title,
      updatedAt: project.updatedAt,
    });
  }

  async create(project: Project) {
    this.items.push(project);
  }

  async save(project: Project): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === project.id);

    this.items[itemIndex] = project;
  }

  async findById({ id }: findByIdProps): Promise<Project | null> {
    const project = this.items.find(item => item.id.toString() === id);

    if (!project) {
      return null;
    }

    return project;
  }

  async findMany(page: number): Promise<Project[]> {
    const projects = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return projects;
  }

  async delete(project: Project): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === project.id);

    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
    }

    await this.projectAttachment.deleteManyByProjectId(
      project.attachments.getItems()
    );
  }
}
