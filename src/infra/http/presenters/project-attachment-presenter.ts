import { Attachment } from '@/domain/feedback/enterprise/entities/attachment';

export class ProjectAttachmentPresenter {
  static toHttp(attachment: Attachment) {
    return {
      title: attachment.title,
      url: attachment.url,
    };
  }
}
