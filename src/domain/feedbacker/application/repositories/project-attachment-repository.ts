import { ProjectAttachment } from '../../enterprise/entities/project-attachment';

export abstract class ProjectAttachmentsRepository {
  abstract findManyByProjectId(projectId: string): Promise<ProjectAttachment[]>;
  abstract deleteManyByProjectId(
    projectAttachments: ProjectAttachment[]
  ): Promise<void>;
  abstract createMany(projectAttachments: ProjectAttachment[]): Promise<void>;
}
