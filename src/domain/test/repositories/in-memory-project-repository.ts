import { Project } from '@/domain/feedback/enterprise/project';
import { ProjectRepository } from 'src/domain/feedback/application/repositories/project-repository';

export class InMemoryProjectRepository implements ProjectRepository {
  public items: Project[] = [];

  async create(project: Project) {
    this.items.push(project);
  }

  async save(project: Project): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === project.id);

    this.items[itemIndex] = project;
  }

  async findById(id: string): Promise<Project | null> {
    throw new Error('Method not implemented.');
  }
}
