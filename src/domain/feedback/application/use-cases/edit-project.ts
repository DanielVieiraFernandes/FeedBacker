import { Either, left, right } from '@/core/either';
import { Project } from '../../enterprise/entities/project';
import { ProjectAttachment } from '../../enterprise/entities/project-attachment';
import { ProjectRepository } from '../repositories/project-repository';
import { ProjectDoesNotExistError } from './errors/project-does-not-exist';
import { UserNotAllowedError } from './errors/user-not-allowed';

interface EditProjectUseCaseRequest {
  authorId: string;
  projectId: string;
  title: string;
  description: string;
  repositoryLink: string;
}

type EditProjectUseCaseResponse = Either<
  ProjectDoesNotExistError | UserNotAllowedError,
  {
    project: Project;
  }
>;

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
      id: projectId,
    });

    if (!project) {
      return left(new ProjectDoesNotExistError());
    }

    console.log('project ', project);

    if (authorId !== project.authorId.toString()) {
      return left(new UserNotAllowedError());
    }

    project.title = title;
    project.description = description;
    project.repositoryLink = repositoryLink;

    await this.projectRepository.save(project);

    return right({
      project,
    });
  }
}
