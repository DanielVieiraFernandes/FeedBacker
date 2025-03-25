import { Attachment } from '../../enterprise/attachment';

export abstract class AttachmentRepository {
  abstract create(attachment: Attachment): Promise<void>;
}
