import {
  UploadParams,
  Uploader,
} from '@/domain/feedback/application/storage/uploader';

export class R2Storage implements Uploader {
  upload(params: UploadParams): Promise<{ url: string }> {
    throw new Error('Method not implemented.');
  }
}
