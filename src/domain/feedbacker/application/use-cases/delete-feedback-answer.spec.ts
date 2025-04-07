import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { makeFeedback } from 'test/factories/make-feedback';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { DeleteFeedbackAnswerUseCase } from './delete-feedback-answer';
import { UserNotAllowedError } from './errors/user-not-allowed';

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: DeleteFeedbackAnswerUseCase;

describe('delete feedback answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new DeleteFeedbackAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to delete a feedback answer', async () => {
    const feedback = makeFeedback();

    const answer = makeAnswer({
      feedbackId: feedback.id,
      authorId: new UniqueEntityID('author-1'),
      content: 'Initial content',
    });

    inMemoryAnswersRepository.items.push(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-1',
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a feedback answer when user another from', async () => {
    const feedback = makeFeedback();

    const answer = makeAnswer({
      feedbackId: feedback.id,
      authorId: new UniqueEntityID('author-1'),
      content: 'Initial content',
    });

    inMemoryAnswersRepository.items.push(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(UserNotAllowedError);
  });
});
