import {
  ProjectAttachment,
  ProjectAttachmentProps,
} from '@/domain/feedback/enterprise/entities/project-attachment';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
export function makeProjectAttachment(
  override: Partial<ProjectAttachmentProps> = {},
  id?: UniqueEntityID
) {
  const projectattachment = ProjectAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      projectId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return projectattachment;
}
