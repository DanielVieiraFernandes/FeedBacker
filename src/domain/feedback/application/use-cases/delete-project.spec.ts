import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAdmin } from 'test/factories/make-admin';
import { makeProject } from 'test/factories/make-project';
import { InMemoryProjectAttachmentRepository } from 'test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from 'test/repositories/in-memory-project-repository';
import { DeleteProjectUseCase } from './delete-project';
import { UserNotAllowedError } from './errors/user-not-allowed';

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

  it('should not be able to delete a project when user another from project', async () => {
    const admin = makeAdmin({}, new UniqueEntityID('author-1'));

    const newProject = makeProject({
      authorId: admin.id,
    });

    inMemoryProjectRepository.items.push(newProject);

    const result = await sut.execute({
      authorId: 'author-2',
      projectId: newProject.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserNotAllowedError);
  });
});
