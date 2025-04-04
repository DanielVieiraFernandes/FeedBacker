import { Project } from '../../enterprise/entities/project';
import { ProjectDetails } from '../../enterprise/value-objects/project-details';
import { findByIdProps } from './interfaces/find-by-d-interface';

export abstract class ProjectRepository {
  abstract create(project: Project): Promise<void>;
  abstract save(project: Project): Promise<void>;
  abstract findById(param: findByIdProps): Promise<Project | null>;
  abstract findDetailsById(
    param: findByIdProps
  ): Promise<ProjectDetails | null>;
  abstract findMany(page: number): Promise<Project[]>;
  abstract delete(project: Project): Promise<void>;
}
