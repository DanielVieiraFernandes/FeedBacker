import { ProjectRepository } from '../repositories/project-repository';
import { ProjectDoesNotExistError } from './errors/project-does-not-exist';
import { UserNotAllowedError } from './errors/user-not-allowed';

interface DeleteProjectUseCaseRequest {
  authorId: string;
  projectId: string;
}

interface DeleteProjectUseCaseResponse {}

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
      throw new ProjectDoesNotExistError();
    }

    if (authorId !== project.authorId.toString()) {
      throw new UserNotAllowedError();
    }

    await this.projectRepository.delete(project.projectId.toString());

    return {};
  }
}
