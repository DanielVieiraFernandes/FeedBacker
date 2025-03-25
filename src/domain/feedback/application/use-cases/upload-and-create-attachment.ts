import { Attachment } from '../../enterprise/attachment';
import { AttachmentRepository } from '../repositories/attachment-repository';
import { Uploader } from '../storage/uploader';
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-file-type';

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}

interface UploadAndCreateAttachmentUseCaseResponse {
  attachment: Attachment;
}

export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentRepository: AttachmentRepository,
    private uploader: Uploader
  ) {}

  async execute({
    body,
    fileName,
    fileType,
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      throw new InvalidAttachmentTypeError(fileType);
    }

    const { url } = await this.uploader.upload({ body, fileName, fileType });

    const attachment = Attachment.create({
      title: fileName,
      url,
    });

    await this.attachmentRepository.create(attachment);

    return {
      attachment,
    };
  }
}
