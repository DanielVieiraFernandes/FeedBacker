import { Injectable } from '@nestjs/common';
import { ProjectDetails } from '../../enterprise/value-objects/project-details';
import { ProjectRepository } from '../repositories/project-repository';
import { ProjectDoesNotExistError } from './errors/project-does-not-exist';

interface GetProjectDetailsUseCaseRequest {
  projectId: string;
}

interface GetProjectDetailsUseCaseResponse {
  project: ProjectDetails;
}

@Injectable()
export class GetProjectDetailsUseCase {
  constructor(private projectsRepository: ProjectRepository) {}

  async execute({
    projectId,
  }: GetProjectDetailsUseCaseRequest): Promise<GetProjectDetailsUseCaseResponse> {
    const project = await this.projectsRepository.findById({
      id: projectId,
    });

    if (!project) {
      throw new ProjectDoesNotExistError();
    }

    return {
      project,
    };
  }
}
