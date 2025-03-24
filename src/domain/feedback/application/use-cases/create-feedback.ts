import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Feedback } from '../../enterprise/feedback';
import { FeedbackRepository } from '../repositories/feedback-repository';

interface CreateFeedbackUseCaseRequest {
  authorId: string;
  projectId: string;
  grade: number;
  comment: string;
  title: string;
}

interface CreateFeedbackUseCaseResponse {}

export class CreateFeedbackUseCase {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async execute({
    authorId,
    projectId,
    grade,
    comment,
    title,
  }: CreateFeedbackUseCaseRequest): Promise<CreateFeedbackUseCaseResponse> {
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
