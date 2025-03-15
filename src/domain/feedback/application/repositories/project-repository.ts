import { Project } from '../../enterprise/project';

export abstract class ProjectRepository {
  abstract create(project: Project): Promise<void>;
  abstract save(project: Project): Promise<void>;
  abstract findById(id: string): Promise<Project | null>;
}
