export abstract class ProjectAttachment {
  abstract findByProjectId(projectId: string): Promise<ProjectAttachment[]>;
  abstract deleteManyByProjectId(projectId: string): Promise<void>;
}
