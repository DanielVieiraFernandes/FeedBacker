import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface ProjectAttachmentProps {
  projectId: string;
  attachmentId: string;
}

export class ProjectAttachment extends Entity<ProjectAttachmentProps> {
  get projectId() {
    return this.props.projectId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: ProjectAttachmentProps, id?: UniqueEntityID) {
    const projectAttachment = new ProjectAttachment(props, id);

    return projectAttachment;
  }
}
