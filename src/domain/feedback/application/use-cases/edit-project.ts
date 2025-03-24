import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Project } from '../../enterprise/project';
import { ProjectAttachment } from '../../enterprise/project-attachment';
import { ProjectRepository } from '../repositories/project-repository';
import { ProjectDoesNotExistError } from './errors/project-does-not-exist';

interface EditProjectUseCaseRequest {
  authorId: string;
  projectId: string;
  title: string;
  description: string;
  repositoryLink: string;
}

interface EditProjectUseCaseResponse {
  project: Project;
}

export class EditProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    title,
    authorId,
    description,
    repositoryLink,
    projectId,
  }: EditProjectUseCaseRequest): Promise<EditProjectUseCaseResponse> {
    const project = await this.projectRepository.findById({
      authorId,
      id: projectId,
    });

    if (!project) {
      throw new ProjectDoesNotExistError();
    }

    project.title = title;
    project.description = description;
    project.repositoryLink = repositoryLink;

    await this.projectRepository.save(project);

    return {
      project,
    };
  }
}
