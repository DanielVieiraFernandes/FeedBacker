import { makeAdmin } from '@/domain/test/factories/make-admin';
import { InMemoryProjectAttachmentRepository } from '@/domain/test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from '@/domain/test/repositories/in-memory-project-repository';
import { CreateProjectUseCase } from './create-project';

let inMemoryProjectRepository: InMemoryProjectRepository;
let inMemoryProjectAttachmentRepository: InMemoryProjectAttachmentRepository;
let sut: CreateProjectUseCase;

describe('Create project', () => {
  beforeEach(() => {
    inMemoryProjectAttachmentRepository =
      new InMemoryProjectAttachmentRepository();
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
      attachmentsIds: [],
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
