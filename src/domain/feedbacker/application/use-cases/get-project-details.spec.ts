import { makeAdmin } from 'test/factories/make-admin';
import { makeProject } from 'test/factories/make-project';
import { InMemoryProjectAttachmentsRepository } from 'test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from 'test/repositories/in-memory-project-repository';
import { GetProjectDetailsUseCase } from './get-project-details';

let inMemoryProjectRepository: InMemoryProjectRepository;
let inMemoryProjectAttachmentRepository: InMemoryProjectAttachmentsRepository;
let sut: GetProjectDetailsUseCase;

describe('Get project details', () => {
  beforeEach(() => {
    inMemoryProjectAttachmentRepository =
      new InMemoryProjectAttachmentsRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryProjectAttachmentRepository
    );
    sut = new GetProjectDetailsUseCase(inMemoryProjectRepository);
  });

  it('should be able to fetch recent projects', async () => {
    const project = makeProject({
      title: 'New Project',
      description: 'project description',
    });

    await inMemoryProjectRepository.create(project);

    const result = await sut.execute({ projectId: project.id.toString() });

    expect(result.isRight()).toBeTruthy();

    if (result.isRight()) {
      expect(result.value.project).toEqual(
        expect.objectContaining({
          title: 'New Project',
          description: 'project description',
        })
      );
    }
  });
});
