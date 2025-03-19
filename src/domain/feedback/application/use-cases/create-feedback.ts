import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Feedback } from '../../enterprise/feedback';
import { FeedbackRepository } from '../repositories/feedback-repository';

interface CreateFeedbackUseCaseRequest {
  authorId: string;
  grade: number;
  comment: string;
  title: string;
}

interface CreateFeedbackUseCaseResponse {}

export class CreateFeedbackUseCase {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async execute({
    authorId,
    grade,
    comment,
    title,
  }: CreateFeedbackUseCaseRequest): Promise<CreateFeedbackUseCaseResponse> {
    const feedback = Feedback.create({
      authorId: new UniqueEntityID(authorId),
      grade,
      comment,
      title,
    });

    await this.feedbackRepository.create(feedback);

    return {};
  }
}
