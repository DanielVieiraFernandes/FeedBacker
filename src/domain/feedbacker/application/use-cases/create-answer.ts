import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

interface CreateAnswerUseCaseRequest {
  authorId: string;
  feedbackId: string;
  content: string;
}

type CreateAnswerUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

export class CreateAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    feedbackId,
    content,
  }: CreateAnswerUseCaseRequest): Promise<CreateAnswerUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityID(authorId),
      feedbackId: new UniqueEntityID(feedbackId),
      content,
    });

    await this.answerRepository.create(answer);

    return right({
      answer,
    });
  }
}
