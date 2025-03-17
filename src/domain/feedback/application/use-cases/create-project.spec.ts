import { makeAdmin } from '@/domain/test/factories/make-admin';
import { InMemoryProjectRepository } from '@/domain/test/repositories/in-memory-project-repository';
import { CreateProjectUseCase } from './create-project';

let inMemoryProjectRepository: InMemoryProjectRepository;

let sut: CreateProjectUseCase;

describe('Create project', () => {
  beforeEach(() => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    sut = new CreateProjectUseCase(inMemoryProjectRepository);
  });

  it('should be able to create a project', async () => {
    const admin = makeAdmin();

    await sut.execute({
      authorId: admin.id.toString(),
      title: 'New Project',
      description: 'description',
      repositoryLink: 'link',
    });

    expect(inMemoryProjectRepository.items).toHaveLength(1);
    expect(inMemoryProjectRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          authorId: admin.id,
          title: 'New Project',
          description: 'description',
          repositoryLink: 'link',
        }),
      ])
    );
  });
});
