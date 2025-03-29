import { AttachmentRepository } from '@/domain/feedback/application/repositories/attachment-repository';
import { Attachment } from '@/domain/feedback/enterprise/entities/attachment';

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public items: Attachment[] = [];

  async create(attachment: Attachment): Promise<void> {
    this.items.push(attachment);
  }
}
