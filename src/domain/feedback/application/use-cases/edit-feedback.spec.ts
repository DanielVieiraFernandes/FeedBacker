import { makeAdmin } from 'test/factories/make-admin';
import { makeFeedback } from 'test/factories/make-feedback';
import { makeMember } from 'test/factories/make-member';
import { makeProject } from 'test/factories/make-project';
import { InMemoryFeedbackRepository } from 'test/repositories/in-memory-feedback-repository';
import { InMemoryProjectAttachmentRepository } from 'test/repositories/in-memory-project-attachment-repoitory';
import { InMemoryProjectRepository } from 'test/repositories/in-memory-project-repository';
import { EditFeedbackUseCase } from './edit-feedback';
import { EditProjectUseCase } from './edit-project';
import { FeedbackDoesNotExistError } from './errors/feedback-does-not-exist';
import { ProjectDoesNotExistError } from './errors/project-does-not-exist';

let inMemoryFeedbackRepository: InMemoryFeedbackRepository;
let sut: EditFeedbackUseCase;

describe('Edit Feedback', () => {
  beforeEach(() => {
    inMemoryFeedbackRepository = new InMemoryFeedbackRepository();
    sut = new EditFeedbackUseCase(inMemoryFeedbackRepository);
  });

  it('should be able to edit feedback', async () => {
    const admin = makeAdmin();
    const member = makeMember({
      name: 'John Doe',
    });

    const newProject = makeProject({
      authorId: admin.id,
    });

    const newFeedback = makeFeedback({
      authorId: member.id,
      comment: 'Muito bacana!',
      grade: 4,
      title: 'Ótimo projeto',
    });

    inMemoryFeedbackRepository.items.push(newFeedback);

    const { feedback } = await sut.execute({
      authorId: member.id.toString(),
      feedbackId: newFeedback.id.toString(),
      comment: 'Idéia bacana, simples porém útil, muito boa para praticar',
      grade: 5,
      title: 'Perfeito',
    });

    expect(feedback).toBeTruthy();
    expect(feedback).toEqual(
      expect.objectContaining({
        authorId: member.id,
        comment: 'Idéia bacana, simples porém útil, muito boa para praticar',
        grade: 5,
        title: 'Perfeito',
      })
    );
  });

  it('should not able to edit feedback when this not exist', async () => {
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
        comment: 'dasdas',
        feedbackId: 'not-exist-id',
        grade: 4,
      })
    ).rejects.toBeInstanceOf(FeedbackDoesNotExistError);
  });
});
