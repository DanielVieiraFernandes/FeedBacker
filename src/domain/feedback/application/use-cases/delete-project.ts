import { ProjectRepository } from '../repositories/project-repository';
import { ProjectDoesNotExistError } from './errors/project-does-not-exist';

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
      authorId,
      id: projectId,
    });

    if (!project) {
      throw new ProjectDoesNotExistError();
    }

    await this.projectRepository.delete(project.id.toString());

    return {};
  }
}
