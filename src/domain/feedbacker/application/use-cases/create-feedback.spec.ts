import { InvalidGradeError } from '@/core/error/errors/invalid-grade-error';
import { makeAdmin } from 'test/factories/make-admin';
import { makeProject } from 'test/factories/make-project';
import { InMemoryFeedbackRepository } from 'test/repositories/in-memory-feedback-repository';
import { CreateFeedbackUseCase } from './create-feedback';

let inMemoryFeedbackRepository: InMemoryFeedbackRepository;
let sut: CreateFeedbackUseCase;
describe('Create Feedback', () => {
  beforeEach(() => {
    inMemoryFeedbackRepository = new InMemoryFeedbackRepository();
    sut = new CreateFeedbackUseCase(inMemoryFeedbackRepository);
  });

  it('Should be able to create a feedback', async () => {
    const admin = makeAdmin();
    const project = makeProject();

    await sut.execute({
      authorId: admin.id.toString(),
      projectId: project.id.toString(),
      grade: 5,
      comment: 'New Comment',
      title: 'New Title',
    });

    expect(inMemoryFeedbackRepository.items).toHaveLength(1);
    expect(inMemoryFeedbackRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          grade: 5,
          authorId: admin.id,
          comment: 'New Comment',
          title: 'New Title',
        }),
      ])
    );
  });

  it('Should not be able to create a feedback when grade is invalid', async () => {
    const admin = makeAdmin();
    const project = makeProject();

    const result = await sut.execute({
      authorId: admin.id.toString(),
      projectId: project.id.toString(),
      grade: 6,
      comment: 'New Comment',
      title: 'New Title',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidGradeError);
  });
});
