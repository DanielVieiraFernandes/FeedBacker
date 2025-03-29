import { UniqueEntityID } from '@/core/entities/unique-entity-id';
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

interface CreateFeedbackUseCaseResponse {}

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
      throw new Error();
    }

    const feedback = Feedback.create({
      authorId: new UniqueEntityID(authorId),
      projectId: new UniqueEntityID(projectId),
      grade,
      comment,
      title,
    });

    await this.feedbackRepository.create(feedback);

    return {};
  }
}
