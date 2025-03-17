import { makeAdmin } from '@/domain/test/factories/make-admin';
import { InMemoryAdminRepository } from '@/domain/test/repositories/in-memory-admin-repository';
import { InMemoryProjectRepository } from '@/domain/test/repositories/in-memory-project-repository';
import { CreateProjectUseCase } from './create-project';

let inMemoryProjectRepository: InMemoryProjectRepository;
let inMemoryAdminRepository: InMemoryAdminRepository;
let sut: CreateProjectUseCase;

describe('Project Unit Tests', () => {
  beforeEach(() => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    inMemoryAdminRepository = new InMemoryAdminRepository();
    sut = new CreateProjectUseCase(inMemoryProjectRepository);
  });

  it('should be able to create a project', async () => {
    const admin = makeAdmin();

    await sut.execute({
      authorId: admin.id.toString(),
      title: 'New Project',
      description: 'description',
      link: 'link',
    });

    expect(inMemoryProjectRepository.items).toHaveLength(1);
    expect(inMemoryProjectRepository.items[0].props).toEqual(
      expect.objectContaining({
        title: 'New Project',
        description: 'description',
        link: 'link',
      })
    );
  });
});
