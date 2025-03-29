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
      id: projectId,
    });

    if (!project) {
      throw new ProjectDoesNotExistError();
    }

    if (authorId !== project.authorId.toString()) {
      throw new UserNotAllowedError();
    }

    const projectToDomain = Project.create({
      authorId: project.authorId,
      description,
      repositoryLink,
      title,
      attachments: project.attachments.map(attachment =>
        ProjectAttachment.create({
          attachmentId: attachment.id.toString(),
          projectId: project.projectId.toString(),
        })
      ),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    });

    projectToDomain.title = title;
    projectToDomain.description = description;
    projectToDomain.repositoryLink = repositoryLink;

    await this.projectRepository.save(projectToDomain);

    return {
      project: projectToDomain,
    };
  }
}
