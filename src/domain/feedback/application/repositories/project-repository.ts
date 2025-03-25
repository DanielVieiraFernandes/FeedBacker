import { Project } from '../../enterprise/project';
import { findByIdProps } from './interfaces/find-by-d-interface';



export abstract class ProjectRepository {
  abstract create(project: Project): Promise<void>;
  abstract save(project: Project): Promise<void>;
  abstract findById(param: findByIdProps): Promise<Project | null>;
  abstract findMany(page: number): Promise<Project[]>; 
  abstract delete(id: string): Promise<void>;
}
