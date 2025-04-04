import { Either, left, right } from '@/core/either';
import { Attachment } from '../../enterprise/entities/attachment';
import { AttachmentRepository } from '../repositories/attachment-repository';
import { Uploader } from '../storage/uploader';
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-file-type';

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}

type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment;
  }
>;

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
      return left(new InvalidAttachmentTypeError(fileType));
    }
    4;

    const { url } = await this.uploader.upload({ body, fileName, fileType });

    const attachment = Attachment.create({
      title: fileName,
      url,
    });

    await this.attachmentRepository.create(attachment);

    return right({
      attachment,
    });
  }
}
