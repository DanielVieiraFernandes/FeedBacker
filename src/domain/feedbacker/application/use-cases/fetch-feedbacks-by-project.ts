import { Either, right } from '@/core/either';
import { Feedback } from '@/domain/feedbacker/enterprise/entities/feedback';
import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from '../repositories/feedback-repository';

interface FetchFeedbacksByProjectUseCaseRequest {
  projectId: string;
  page: number;
}

type FetchFeedbacksByProjectUseCaseResponse = Either<
  null,
  {
    feedbacks: Feedback[];
  }
>;

@Injectable()
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

    return right({
      feedbacks,
    });
  }
}
