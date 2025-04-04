import { Either, left, right } from '@/core/either';
import { ProjectRepository } from '../repositories/project-repository';
import { ProjectDoesNotExistError } from './errors/project-does-not-exist';
import { UserNotAllowedError } from './errors/user-not-allowed';

interface DeleteProjectUseCaseRequest {
  authorId: string;
  projectId: string;
}

type DeleteProjectUseCaseResponse = Either<
  ProjectDoesNotExistError | UserNotAllowedError,
  {}
>;

export class DeleteProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    authorId,
    projectId,
  }: DeleteProjectUseCaseRequest): Promise<DeleteProjectUseCaseResponse> {
    const project = await this.projectRepository.findById({
      id: projectId,
    });

    if (!project) {
      return left(new ProjectDoesNotExistError());
    }

    if (authorId !== project.authorId.toString()) {
      return left(new UserNotAllowedError());
    }

    await this.projectRepository.delete(project);

    return right({});
  }
}
