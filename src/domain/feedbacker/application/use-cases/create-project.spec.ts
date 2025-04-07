import { makeAdmin } from 'test/factories/make-admin';
import { InMemoryProjectAttachmentsRepository } from 'test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from 'test/repositories/in-memory-project-repository';
import { CreateProjectUseCase } from './create-project';

let inMemoryProjectRepository: InMemoryProjectRepository;
let inMemoryProjectAttachmentRepository: InMemoryProjectAttachmentsRepository;
let sut: CreateProjectUseCase;

describe('Create project', () => {
  beforeEach(() => {
    inMemoryProjectAttachmentRepository =
      new InMemoryProjectAttachmentsRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryProjectAttachmentRepository
    );
    sut = new CreateProjectUseCase(inMemoryProjectRepository);
  });

  it('should be able to create a project', async () => {
    const admin = makeAdmin();

    await sut.execute({
      authorId: admin.id.toString(),
      title: 'New Project',
      description: 'description',
      repositoryLink: 'link',
      attachmentsIds: ['1', '2'],
    });

    expect(inMemoryProjectRepository.items).toHaveLength(1);
    expect(inMemoryProjectRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'New Project',
          description: 'description',
          repositoryLink: 'link',
        }),
      ])
    );
  });
});
