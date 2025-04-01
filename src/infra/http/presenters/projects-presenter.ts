import { Project } from '@/domain/feedback/enterprise/entities/project';
export class ProjectsPresenter {
  static toHttp(project: Project) {
    return {
      id: project.id.toString(),
      title: project.title,
      description: project.description,
      repositoryLink: project.repositoryLink,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
