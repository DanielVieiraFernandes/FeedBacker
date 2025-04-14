import { Either, left, right } from '@/core/either';
import { InvalidAttachmentTypeError } from '@/core/error/errors/invalid-attachment-file-type';
import { Attachment } from '../../enterprise/entities/attachment';
import { AttachmentRepository } from '../repositories/attachment-repository';
import { Uploader } from '../storage/uploader';
import { Injectable } from '@nestjs/common';

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

@Injectable()
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
