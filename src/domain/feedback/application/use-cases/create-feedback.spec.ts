import { makeAdmin } from 'test/factories/make-admin';
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

    await sut.execute({
      authorId: admin.id.toString(),
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
});
