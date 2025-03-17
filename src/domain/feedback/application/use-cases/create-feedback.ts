import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Feedback } from '../../enterprise/feedback';
import { FeedbackRepository } from '../repositories/feedback-repository';

interface CreateFeedbackUseCaseRequest {
  authorId: string;
  grade: number;
}

interface CreateFeedbackUseCaseResponse {}

export class CreateFeedbackUseCase {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async execute({
    authorId,
    grade,
  }: CreateFeedbackUseCaseRequest): Promise<CreateFeedbackUseCaseResponse> {
    const feedback = Feedback.create({
      authorId: new UniqueEntityID(authorId),
      grade,
    });

    await this.feedbackRepository.create(feedback);

    return {};
  }
}
