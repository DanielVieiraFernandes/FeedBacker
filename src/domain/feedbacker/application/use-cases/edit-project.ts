import { Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ProjectDoesNotExistError } from '@/core/error/errors/project-does-not-exist';
import { UserNotAllowedError } from '@/core/error/errors/user-not-allowed';
import { Project } from '../../enterprise/entities/project';
import { ProjectAttachment } from '../../enterprise/entities/project-attachment';
import { ProjectAttachmentList } from '../../enterprise/entities/project-attachment-list';
import { ProjectAttachmentsRepository } from '../repositories/project-attachment-repository';
import { ProjectRepository } from '../repositories/project-repository';

interface EditProjectUseCaseRequest {
  authorId: string;
  projectId: string;
  title: string;
  description: string;
  repositoryLink: string;
  attachmentsIds: string[];
}

type EditProjectUseCaseResponse = Either<
  ProjectDoesNotExistError | UserNotAllowedError,
  {
    project: Project;
  }
>;

export class EditProjectUseCase {
  constructor(
    private projectRepository: ProjectRepository,
    private projectAttachmentsRepository: ProjectAttachmentsRepository
  ) {}

  async execute({
    title,
    authorId,
    description,
    repositoryLink,
    projectId,
    attachmentsIds,
  }: EditProjectUseCaseRequest): Promise<EditProjectUseCaseResponse> {
    const project = await this.projectRepository.findById({
      id: projectId,
    });

    if (!project) {
      return left(new ProjectDoesNotExistError());
    }

    if (authorId !== project.authorId.toString()) {
      return left(new UserNotAllowedError());
    }

    const currentProjectAttachments =
      await this.projectAttachmentsRepository.findManyByProjectId(
        project.id.toString()
      );

    const projectAttachmentList = new ProjectAttachmentList(
      currentProjectAttachments
    );

    const newProjectAttachments = attachmentsIds.map(attachmentId => {
      return ProjectAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        projectId: project.id,
      });
    });

    projectAttachmentList.update(newProjectAttachments);

    project.attachments = projectAttachmentList;
    project.title = title;
    project.description = description;
    project.repositoryLink = repositoryLink;

    await this.projectRepository.save(project);

    return right({
      project,
    });
  }
}
