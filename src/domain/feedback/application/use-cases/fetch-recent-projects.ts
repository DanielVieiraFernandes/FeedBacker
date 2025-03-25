import { Project } from '../../enterprise/project';
import { ProjectRepository } from '../repositories/project-repository';

interface FetchRecentProjectsUseCaseRequest {
  page: number;
}

interface FetchRecentProjectsUseCaseResponse {
  projects: Project[];
}

export class FetchRecentProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    page,
  }: FetchRecentProjectsUseCaseRequest): Promise<FetchRecentProjectsUseCaseResponse> {
    const projects = await this.projectRepository.findMany(page);

    return {
      projects,
    };
  }
}
