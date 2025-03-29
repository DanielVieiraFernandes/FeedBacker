import { ProjectAttachment } from '../../enterprise/entities/project-attachment';

export abstract class ProjectAttachmentRepository {
  abstract createMany(projectAttachments: ProjectAttachment[]): Promise<void>;
  abstract findByProjectId(projectId: string): Promise<ProjectAttachment[]>;
  abstract deleteManyByProjectId(projectId: string): Promise<void>;
}
