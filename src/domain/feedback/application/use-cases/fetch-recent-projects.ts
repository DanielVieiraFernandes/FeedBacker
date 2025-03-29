import { Injectable } from '@nestjs/common';
import { ProjectDetails } from '../../enterprise/value-objects/project-details';
import { ProjectRepository } from '../repositories/project-repository';

interface FetchRecentProjectsUseCaseRequest {
  page: number;
}

interface FetchRecentProjectsUseCaseResponse {
  projects: ProjectDetails[];
}

@Injectable()
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
