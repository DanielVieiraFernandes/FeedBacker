import { Either, left, right } from '@/core/either';
import { ProjectDoesNotExistError } from '@/core/error/errors/project-does-not-exist';
import { Injectable } from '@nestjs/common';
import { ProjectDetails } from '../../enterprise/value-objects/project-details';
import { ProjectRepository } from '../repositories/project-repository';

interface GetProjectDetailsUseCaseRequest {
  projectId: string;
}

type GetProjectDetailsUseCaseResponse = Either<
  ProjectDoesNotExistError,
  {
    project: ProjectDetails;
  }
>;

@Injectable()
export class GetProjectDetailsUseCase {
  constructor(private projectsRepository: ProjectRepository) {}

  async execute({
    projectId,
  }: GetProjectDetailsUseCaseRequest): Promise<GetProjectDetailsUseCaseResponse> {
    const project = await this.projectsRepository.findDetailsById({
      id: projectId,
    });

    if (!project) {
      return left(new ProjectDoesNotExistError());
    }

    return right({
      project,
    });
  }
}
