import { ProjectAttachment } from '../../enterprise/entities/project-attachment';

export abstract class ProjectAttachmentsRepository {
  abstract findManyByProjectId(projectId: string): Promise<ProjectAttachment[]>;
  abstract deleteManyByProjectId(projectId: string): Promise<void>;
}
