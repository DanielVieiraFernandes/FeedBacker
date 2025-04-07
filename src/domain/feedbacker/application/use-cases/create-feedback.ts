import { Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InvalidGradeError } from '@/core/error/errors/invalid-grade-error';
import { Injectable } from '@nestjs/common';
import { Feedback } from '../../enterprise/entities/feedback';
import { FeedbackRepository } from '../repositories/feedback-repository';

interface CreateFeedbackUseCaseRequest {
  authorId: string;
  projectId: string;
  grade: number;
  comment: string;
  title: string;
}

type CreateFeedbackUseCaseResponse = Either<InvalidGradeError, {}>;

@Injectable()
export class CreateFeedbackUseCase {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async execute({
    authorId,
    projectId,
    grade,
    comment,
    title,
  }: CreateFeedbackUseCaseRequest): Promise<CreateFeedbackUseCaseResponse> {
    if (grade < 1 || grade > 5) {
      return left(new InvalidGradeError());
    }

    const feedback = Feedback.create({
      authorId: new UniqueEntityID(authorId),
      projectId: new UniqueEntityID(projectId),
      grade,
      comment,
      title,
    });

    await this.feedbackRepository.create(feedback);

    return right({});
  }
}
