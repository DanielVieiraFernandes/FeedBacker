import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Project } from '../../enterprise/entities/project';
import { ProjectRepository } from '../repositories/project-repository';
import { ProjectDoesNotExistError } from './errors/project-does-not-exist';

interface GetProjectDetailsUseCaseRequest {
  projectId: string;
}

type GetProjectDetailsUseCaseResponse = Either<
  ProjectDoesNotExistError,
  {
    project: Project;
  }
>;

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
      return left(new ProjectDoesNotExistError());
    }

    return right({
      project,
    });
  }
}
