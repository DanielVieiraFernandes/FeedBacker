import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { makeFeedback } from 'test/factories/make-feedback';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { EditFeedbackAnswerUseCase } from './edit-feedback-answer';
import { UserNotAllowedError } from './errors/user-not-allowed';
import { FetchFeedbackAnswersUseCase } from './fetch-feedback-answers';

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: EditFeedbackAnswerUseCase;

describe('edit feedback answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new EditFeedbackAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to edit a feedback answer', async () => {
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
      content: 'New content',
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryAnswersRepository.items[0]).toEqual(
      expect.objectContaining({
        authorId: new UniqueEntityID('author-1'),
        content: 'New content',
      })
    );
  });

  it('should not be able to edit a feedback answer when user another from', async () => {
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
      content: 'New content',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(UserNotAllowedError);
  });
});
