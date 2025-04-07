import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { Project } from '../../enterprise/entities/project';
import { ProjectAttachment } from '../../enterprise/entities/project-attachment';
import { ProjectAttachmentList } from '../../enterprise/entities/project-attachment-list';
import { ProjectRepository } from '../repositories/project-repository';

interface CreateProjectUseCaseRequest {
  authorId: string;
  title: string;
  description: string;
  repositoryLink: string;
  attachmentsIds: string[];
}

type CreateProjectUseCaseResponse = Either<null, {}>;

@Injectable()
export class CreateProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    title,
    authorId,
    description,
    repositoryLink,
    attachmentsIds,
  }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
    const project = Project.create({
      authorId: new UniqueEntityID(authorId),
      description,
      repositoryLink,
      title,
    });

    const projectAttachments = attachmentsIds.map(attachmentId => {
      return ProjectAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        projectId: project.id,
      });
    });

    project.attachments = new ProjectAttachmentList(projectAttachments);

    await this.projectRepository.create(project);

    return right({});
  }
}
