import { WatchedList } from '@/core/entities/watched-list';
import { ProjectAttachment } from './project-attachment';

export class ProjectAttachmentList extends WatchedList<ProjectAttachment> {
  compareItems(a: ProjectAttachment, b: ProjectAttachment): boolean {
    return a.attachmentId === b.attachmentId;
  }
}
