import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

interface CreateFeedbackAnswerUseCaseRequest {
  authorId: string;
  feedbackId: string;
  content: string;
}

type CreateFeedbackAnswerUseCaseResponse = Either<null, {}>;

@Injectable()
export class CreateFeedbackAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    content,
    feedbackId,
  }: CreateFeedbackAnswerUseCaseRequest): Promise<CreateFeedbackAnswerUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityID(authorId),
      feedbackId: new UniqueEntityID(feedbackId),
      content,
    });

    await this.answerRepository.create(answer);

    return right({});
  }
}
