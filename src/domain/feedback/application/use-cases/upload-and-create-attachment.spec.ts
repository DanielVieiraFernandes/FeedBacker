import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachment-repository';
import { FakeUploader } from 'test/storage/fake-uploader';
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-file-type';
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment';

let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let fakeUploader: FakeUploader;
let sut: UploadAndCreateAttachmentUseCase;

describe('Upload and create attachment', () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    fakeUploader = new FakeUploader();
    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentRepository,
      fakeUploader
    );
  });

  it('should be able to create and upload attachment', async () => {
    const { attachment } = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    });

    expect(inMemoryAttachmentRepository.items).toHaveLength(1);
    expect(inMemoryAttachmentRepository.items[0]).toEqual(attachment);
    expect(fakeUploader.uploads).toHaveLength(1);
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      })
    );
  });

  it('should not be able to create attachment when file type is invalid', async () => {
    await expect(() =>
      sut.execute({
        fileName: 'profile.mp3',
        fileType: 'image/mpeg',
        body: Buffer.from(''),
      })
    ).rejects.toBeInstanceOf(InvalidAttachmentTypeError);
  });
});
