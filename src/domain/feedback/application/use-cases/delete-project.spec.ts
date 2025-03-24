import { makeAdmin } from 'test/factories/make-admin';
import { makeProject } from 'test/factories/make-project';
import { InMemoryProjectAttachmentRepository } from 'test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from 'test/repositories/in-memory-project-repository';
import { DeleteProjectUseCase } from './delete-project';

let inMemoryProjectRepository: InMemoryProjectRepository;
let inMemoryProjectAttachmentRepository: InMemoryProjectAttachmentRepository;
let sut: DeleteProjectUseCase;

describe('Delete project', () => {
  beforeEach(() => {
    inMemoryProjectAttachmentRepository =
      new InMemoryProjectAttachmentRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryProjectAttachmentRepository
    );
    sut = new DeleteProjectUseCase(inMemoryProjectRepository);
  });

  it('should be able to delete a project', async () => {
    const admin = makeAdmin();

    const newProject = makeProject({
      authorId: admin.id,
    });

    inMemoryProjectRepository.items.push(newProject);

    await sut.execute({
      authorId: admin.id.toString(),
      projectId: newProject.id.toString(),
    });

    expect(inMemoryProjectRepository.items).toHaveLength(0);
  });
});
