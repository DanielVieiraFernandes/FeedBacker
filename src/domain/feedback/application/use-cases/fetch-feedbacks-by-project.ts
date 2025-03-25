import { Feedback } from '@/domain/feedback/enterprise/feedback';
import { FeedbackRepository } from '../repositories/feedback-repository';

interface FetchFeedbacksByProjectUseCaseRequest {
  projectId: string;
  page: number;
}

interface FetchFeedbacksByProjectUseCaseResponse {
  feedbacks: Feedback[];
}

export class FetchFeedbacksByProjectUseCase {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async execute({
    projectId,
    page,
  }: FetchFeedbacksByProjectUseCaseRequest): Promise<FetchFeedbacksByProjectUseCaseResponse> {
    const feedbacks = await this.feedbackRepository.findByProject(
      projectId,
      page
    );

    return {
      feedbacks,
    };
  }
}
