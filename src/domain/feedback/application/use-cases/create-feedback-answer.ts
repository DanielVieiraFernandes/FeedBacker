import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '../../enterprise/answer';
import { AnswerRepository } from '../repositories/answer-repository';
import { Injectable } from '@nestjs/common';

interface CreateFeedbackAnswerUseCaseRequest {
  authorId: string;
  feedbackId: string;
  content: string;
}

interface CreateFeedbackAnswerUseCaseResponse {}

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

    return {};
  }
}
