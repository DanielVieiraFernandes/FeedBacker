import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { ProjectAttachment } from '../../enterprise/entities/project-attachment';
import { Project } from '../../enterprise/entities/project';
import { ProjectRepository } from '../repositories/project-repository';

interface CreateProjectUseCaseRequest {
  authorId: string;
  title: string;
  description: string;
  repositoryLink: string;
  attachmentsIds: string[];
}

interface CreateProjectUseCaseResponse {}

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
    console.log('Caso de uso: ', authorId);

    const project = Project.create({
      authorId: new UniqueEntityID(authorId),
      description,
      repositoryLink,
      title,
      attachments: [],
    });

    const projectAttachments = attachmentsIds.map(attachmentId => {
      return ProjectAttachment.create({
        attachmentId,
        projectId: project.id.toString(),
      });
    });

    project.attachments = projectAttachments;

    await this.projectRepository.create(project);

    return {};
  }
}
