import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '../../enterprise/answer';
import { AnswerRepository } from '../repositories/answer-repository';

interface CreateAnswerUseCaseRequest {
  authorId: string;
  feedbackId: string;
  content: string;
}

interface CreateAnswerUseCaseResponse {}

export class CreateAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    content,
    feedbackId,
  }: CreateAnswerUseCaseRequest): Promise<CreateAnswerUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityID(authorId),
      feedbackId: new UniqueEntityID(feedbackId),
      content,
    });

    await this.answerRepository.create(answer);

    return {};
  }
}
