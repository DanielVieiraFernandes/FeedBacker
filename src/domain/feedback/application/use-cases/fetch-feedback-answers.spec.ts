import { makeAnswer } from 'test/factories/make-answer';
import { makeFeedback } from 'test/factories/make-feedback';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { FetchFeedbackAnswersUseCase } from './fetch-feedback-answers';

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: FetchFeedbackAnswersUseCase;

describe('Fetch recents answers by feedack', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new FetchFeedbackAnswersUseCase(inMemoryAnswersRepository);
  });

  it('should be able to fetch recent answers by feedback', async () => {
    const feedback = makeFeedback();

    for (let i = 0; i < 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          feedbackId: feedback.id,
          content: `answer-${i}`,
        })
      );
    }

    const { answers } = await sut.execute({
      feedbackId: feedback.id.toString(),
      page: 2,
    });

    expect(answers).toHaveLength(2);
    expect(answers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          feedbackId: feedback.id,
          content: 'answer-21',
        }),
        expect.objectContaining({
          feedbackId: feedback.id,
          content: 'answer-20',
        }),
      ])
    );
  });
});
