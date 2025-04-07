import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ProjectDoesNotExistError } from '@/core/error/errors/project-does-not-exist';
import { UserNotAllowedError } from '@/core/error/errors/user-not-allowed';
import { makeAdmin } from 'test/factories/make-admin';
import { makeProject } from 'test/factories/make-project';
import { makeProjectAttachment } from 'test/factories/make-project-attachment';
import { InMemoryProjectAttachmentsRepository } from 'test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from 'test/repositories/in-memory-project-repository';
import { EditProjectUseCase } from './edit-project';

let inMemoryProjectRepository: InMemoryProjectRepository;
let inMemoryProjectAttachmentRepository: InMemoryProjectAttachmentsRepository;
let sut: EditProjectUseCase;

describe('Edit project', () => {
  beforeEach(() => {
    inMemoryProjectAttachmentRepository =
      new InMemoryProjectAttachmentsRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryProjectAttachmentRepository
    );
    sut = new EditProjectUseCase(
      inMemoryProjectRepository,
      inMemoryProjectAttachmentRepository
    );
  });

  it('should be able to edit project', async () => {
    const newProject = makeProject(
      {
        authorId: new UniqueEntityID('author-1'),
        title: 'New Project',
        description: 'Description',
        repositoryLink: 'link',
      },
      new UniqueEntityID('project-1')
    );

    inMemoryProjectRepository.items.push(newProject);

    inMemoryProjectAttachmentRepository.items.push(
      makeProjectAttachment({
        projectId: newProject.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeProjectAttachment({
        projectId: newProject.id,
        attachmentId: new UniqueEntityID('2'),
      })
    );

    const result = await sut.execute({
      authorId: 'author-1',
      title: 'Projeto FeedBacker',
      description: 'projeto que conecta a comunidade de desenvolvedores',
      repositoryLink: 'http://feedbacker.git',
      projectId: newProject.id.toString(),
      attachmentsIds: ['1', '3'],
    });

    expect(result.isRight()).toBe(true);
    expect(
      inMemoryProjectRepository.items[0].attachments.currentItems
    ).toHaveLength(2);
    expect(inMemoryProjectRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('3'),
        }),
      ]
    );
  });

  it('should not able to edit project when user another from', async () => {
    const newProject = makeProject({
      authorId: new UniqueEntityID('author-1'),
      title: 'New Project',
      description: 'Description',
      repositoryLink: 'link',
    });

    inMemoryProjectRepository.items.push(newProject);

    const result = await sut.execute({
      authorId: 'author-2',
      title: 'Projeto FeedBacker',
      description: 'projeto que conecta a comunidade de desenvolvedores',
      repositoryLink: 'http://feedbacker.git',
      projectId: newProject.id.toString(),
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserNotAllowedError);
  });
});
