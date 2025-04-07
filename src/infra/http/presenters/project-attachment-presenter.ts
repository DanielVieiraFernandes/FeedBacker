import { Attachment } from '@/domain/feedbacker/enterprise/entities/attachment';

export class ProjectAttachmentPresenter {
  static toHttp(attachment: Attachment) {
    return {
      title: attachment.title,
      url: attachment.url,
    };
  }
}
