import { makeAdmin } from 'test/factories/make-admin';
import { makeFeedback } from 'test/factories/make-feedback';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { CreateAnswerUseCase } from './create-answer';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: CreateAnswerUseCase;
describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new CreateAnswerUseCase(inMemoryAnswerRepository);
  });

  it('Should be able to create a feedback', async () => {
    const admin = makeAdmin();
    const feedback = makeFeedback({
      authorId: admin.id,
    });

    const result = await sut.execute({
      authorId: admin.id.toString(),
      feedbackId: feedback.id.toString(),
      content: 'New answer',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerRepository.items).toHaveLength(1);
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer);
  });
});
