import { makeAdmin } from 'test/factories/make-admin';
import { makeProject } from 'test/factories/make-project';
import { InMemoryProjectAttachmentRepository } from 'test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from 'test/repositories/in-memory-project-repository';
import { EditProjectUseCase } from './edit-project';
import { ProjectDoesNotExistError } from './errors/project-does-not-exist';

let inMemoryProjectRepository: InMemoryProjectRepository;
let inMemoryProjectAttachmentRepository: InMemoryProjectAttachmentRepository;
let sut: EditProjectUseCase;

describe('Edit project', () => {
  beforeEach(() => {
    inMemoryProjectAttachmentRepository =
      new InMemoryProjectAttachmentRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryProjectAttachmentRepository
    );
    sut = new EditProjectUseCase(inMemoryProjectRepository);
  });

  it('should be able to edit project', async () => {
    const admin = makeAdmin();

    const newProject = makeProject({
      authorId: admin.id,
      title: 'New Project',
      description: 'Description',
      repositoryLink: 'link',
    });

    inMemoryProjectRepository.items.push(newProject);

    const { project } = await sut.execute({
      authorId: admin.id.toString(),
      title: 'Projeto FeedBacker',
      description: 'projeto que conecta a comunidade de desenvolvedores',
      repositoryLink: 'http://feedbacker.git',
      projectId: newProject.id.toString(),
    });

    expect(project).toBeTruthy();
    expect(project).toEqual(
      expect.objectContaining({
        authorId: admin.id,
        title: 'Projeto FeedBacker',
        description: 'projeto que conecta a comunidade de desenvolvedores',
        repositoryLink: 'http://feedbacker.git',
      })
    );
  });

  it('should not able to edit project when this not exist', async () => {
    const admin = makeAdmin();

    const newProject = makeProject({
      authorId: admin.id,
      title: 'New Project',
      description: 'Description',
      repositoryLink: 'link',
    });

    await expect(() =>
      sut.execute({
        authorId: admin.id.toString(),
        title: 'Projeto FeedBacker',
        description: 'projeto que conecta a comunidade de desenvolvedores',
        repositoryLink: 'http://feedbacker.git',
        projectId: newProject.id.toString(),
      })
    ).rejects.toBeInstanceOf(ProjectDoesNotExistError);
  });
});
