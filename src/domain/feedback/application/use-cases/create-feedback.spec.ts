import { makeAdmin } from '@/domain/test/factories/make-admin';
import { InMemoryFeedbackRepository } from '@/domain/test/repositories/in-memory-feedback-repository';
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
    });

    expect(inMemoryFeedbackRepository.items).toHaveLength(1);
    expect(inMemoryFeedbackRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          grade: 5,
          authorId: admin.id,
        }),
      ])
    );
  });
});
