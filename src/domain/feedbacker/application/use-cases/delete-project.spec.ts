import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { UserNotAllowedError } from '@/core/error/errors/user-not-allowed';
import { makeAdmin } from 'test/factories/make-admin';
import { makeProject } from 'test/factories/make-project';
import { makeProjectAttachment } from 'test/factories/make-project-attachment';
import { InMemoryProjectAttachmentsRepository } from 'test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from 'test/repositories/in-memory-project-repository';
import { DeleteProjectUseCase } from './delete-project';

let inMemoryProjectRepository: InMemoryProjectRepository;
let inMemoryProjectAttachmentRepository: InMemoryProjectAttachmentsRepository;
let sut: DeleteProjectUseCase;

describe('Delete project', () => {
  beforeEach(() => {
    inMemoryProjectAttachmentRepository =
      new InMemoryProjectAttachmentsRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryProjectAttachmentRepository
    );
    sut = new DeleteProjectUseCase(inMemoryProjectRepository);
  });

  it('should be able to delete a project', async () => {
    const newProject = makeProject({
      authorId: new UniqueEntityID('author-1'),
    });

    inMemoryProjectRepository.items.push(newProject);

    inMemoryProjectAttachmentRepository.items.push(
      makeProjectAttachment({
        projectId: newProject.id,
      })
    );

    await sut.execute({
      authorId: 'author-1',
      projectId: newProject.id.toString(),
    });

    expect(inMemoryProjectRepository.items).toHaveLength(0);
    expect(inMemoryProjectAttachmentRepository.items).toHaveLength(0);
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
