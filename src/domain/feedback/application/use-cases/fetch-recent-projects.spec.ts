import { makeAdmin } from 'test/factories/make-admin';
import { makeProject } from 'test/factories/make-project';
import { InMemoryProjectAttachmentRepository } from 'test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from 'test/repositories/in-memory-project-repository';
import { FetchRecentProjectsUseCase } from './fetch-recent-projects';

let inMemoryProjectRepository: InMemoryProjectRepository;
let inMemoryProjectAttachmentRepository: InMemoryProjectAttachmentRepository;
let sut: FetchRecentProjectsUseCase;

describe('Fetch recents projects', () => {
  beforeEach(() => {
    inMemoryProjectAttachmentRepository =
      new InMemoryProjectAttachmentRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryProjectAttachmentRepository
    );
    sut = new FetchRecentProjectsUseCase(inMemoryProjectRepository);
  });

  it('should be able to fetch recent projects', async () => {
    const admin = makeAdmin();

    for (let i = 1; i < 23; i++) {
      const project = makeProject({
        authorId: admin.id,
        title: `Project-number-${i}`,
      });

      inMemoryProjectRepository.items.push(project);
    }

    const { projects } = await sut.execute({ page: 2 });

    console.log(projects);

    expect(projects).toHaveLength(2);
    // expect(projects).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       title: `Project-number-3`,
    //     }),
    //     expect.objectContaining({
    //       title: `Project-number-4`,
    //     }),
    //   ])
    // );
  });
});
